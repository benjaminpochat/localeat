import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { DeliveryAddress } from 'src/app/commons/models/delivery-address.model';
import { Product } from 'src/app/commons/models/product.model';
import { SlaughterService } from 'src/app/breeder-area/services/slaughter.service';
import { ProductService } from 'src/app/breeder-area/services/product.service';
import { Batch } from 'src/app/commons/models/batch.model';
import { ProductTemplate } from 'src/app/commons/models/product-template.model';
import { ProductComponent } from '../product/product.component';
import { ViewChild } from '@angular/core';
import { Image } from 'src/app/commons/models/image.model';
import { AccessControlType, AccessControlTypeUtils } from 'src/app/commons/models/access-control-type.model';

@Component({
  selector: 'app-delivery-creation',
  templateUrl: './delivery-creation.component.html',
  styleUrls: ['./delivery-creation.component.css']
})
export class DeliveryCreationComponent implements OnInit {

  @ViewChild(ProductComponent)
  productComponent: ProductComponent;

  slaughter: Slaughter;
  delivery: Delivery;
  createDeliveryEvent = new EventEmitter<Slaughter>();
  deliveryDateForm: FormGroup;
  deliveryPlaceForm: FormGroup;
  accessControlForm: FormGroup;
  batchesForm: FormGroup;
  userAlert: string;

  constructor(
    private slaughterService: SlaughterService,
    private productService: ProductService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  initForms(): void {
    this.deliveryDateForm = this.formBuilder.group({
      deliveryDate: [this.slaughter.cuttingDate, Validators.required],
      deliveryStartHour: ['18:00', Validators.required],
      deliveryEndHour: ['20:00', Validators.required]
    });
    this.deliveryPlaceForm = this.formBuilder.group({
      addressName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
    this.accessControlForm = this.formBuilder.group({
      accessControlType: ['', Validators.required],
      sharedKey: [''],
    });
    this.batchesForm = this.formBuilder.group({});
  }

  save(): void{
    if ( this.deliveryDateForm.valid 
      && this.deliveryPlaceForm.valid 
      && this.accessControlForm.valid
      && this.batchesForm.valid 
      ){
        this.delivery.deliveryStart = new Date(this.deliveryDateForm.value.deliveryDate + 'T' + this.deliveryDateForm.value.deliveryStartHour + 'Z');
        this.delivery.deliveryEnd = new Date(this.deliveryDateForm.value.deliveryDate + 'T' + this.deliveryDateForm.value.deliveryEndHour + 'Z');
        this.delivery.accessControl = AccessControlTypeUtils.getAccessControlBuilder(this.accessControlForm.value.accessControlType)(this.accessControlForm.value.sharedKey);
        this.delivery.deliveryAddress = new DeliveryAddress();
        this.delivery.deliveryAddress.name = this.deliveryPlaceForm.value.addressName;
        this.delivery.deliveryAddress.addressLine1 = this.deliveryPlaceForm.value.addressLine1;
        this.delivery.deliveryAddress.zipCode = this.deliveryPlaceForm.value.zipCode;
        this.delivery.deliveryAddress.city = this.deliveryPlaceForm.value.city;
        this.slaughter.delivery = this.delivery;
        this.slaughter.delivery.availableBatches = this.delivery.availableBatches.filter(batch => batch.quantity > 0);
        this.slaughterService.saveSlaughter(this.slaughter).subscribe(slaughter => {
          this.createDeliveryEvent.emit(slaughter);
          this.resetComponent();
      });
    } else {
      this.userAlert = 'Veuillez vérifier les informations saisies.';
    }
  }

  cancel(): void{
    this.resetComponent();
  }

  initDelivery(slaughter: Slaughter, createDeliveryEvent: EventEmitter<Slaughter>): void {
    this.slaughter = slaughter;
    this.delivery = new Delivery();
    this.delivery.availableBatches = [];
    this.delivery.orders = [];
    this.productService.getProductTemplates().subscribe(productTemplates => {
      productTemplates.forEach(productTemplate => this.addBatch(productTemplate));
    });
    this.createDeliveryEvent = createDeliveryEvent;
  }

  addBatch(productTemplate: ProductTemplate): void{
    const product = new Product();
    product.name = productTemplate.name;
    product.unitPrice = productTemplate.unitPrice;
    product.netWeight = productTemplate.netWeight;
    product.description = productTemplate.description;
    this.productService.loadProductTemplatePhoto(productTemplate).subscribe(photo => {
      if (photo) {
        product.photo = new Image();
        product.photo.content = photo.content;
      }
    });
    product.farm = productTemplate.farm;
    const batch = new Batch();
    batch.quantity = 0;
    batch.product = product;
    this.delivery.availableBatches.push(batch);
  }

  private resetComponent(): void {
    this.delivery = null;
    this.deliveryDateForm.reset();
    this.deliveryPlaceForm.reset();
    this.accessControlForm.reset();
    this.batchesForm.reset();
  }

  createProduct(): void {
    this.productComponent.setProduct(new ProductTemplate());
  }

  changeProduct(product: Product): void {
    this.productComponent.setProduct(product);
  }

  getAccessControlTypes(): string[] {
    return Object.keys(AccessControlType).map(key => AccessControlType[key]);
  }

  getAccessControlTypeLabel(accessControlType: AccessControlType) {
    return AccessControlTypeUtils.getAccessControlTypeLabel(accessControlType);
  }

  getAccessControlTypeDetails() {
    return AccessControlTypeUtils.getAccessControlTypeDetails(this.accessControlForm.value.accessControlType);
  }

  isAccessControlledBySharedKey() {
    return this.accessControlForm.value.accessControlType === AccessControlType.SharedKey;
  }
}
