import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { DeliveryAddress } from 'src/app/commons/models/delivery-address.model';
import { Product } from 'src/app/commons/models/product.model';
import { SlaughterService } from '../../services/slaughter.service';
import { ProductService } from '../../services/product.service';
import { Batch } from 'src/app/commons/models/batch.model';

@Component({
  selector: 'app-delivery-creation',
  templateUrl: './delivery-creation.component.html',
  styleUrls: ['./delivery-creation.component.css']
})
export class DeliveryCreationComponent implements OnInit {

  slaughter: Slaughter;
  delivery: Delivery;
  createDeliveryEvent = new EventEmitter<Slaughter>();
  deliveryDateForm: FormGroup;
  deliveryPlaceForm: FormGroup;
  batchesForm: FormGroup;
  userAlert: string;

  constructor(
    private slaughterService: SlaughterService,
    private productService: ProductService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  initForms() {
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
    this.batchesForm = this.formBuilder.group({
    });
  }

  save(){
    if ( this.deliveryDateForm.valid && this.deliveryPlaceForm.valid && this.batchesForm.valid ){
      this.delivery.deliveryStart = new Date(this.deliveryDateForm.value.deliveryDate + 'T' + this.deliveryDateForm.value.deliveryStartHour + 'Z');
      this.delivery.deliveryEnd = new Date(this.deliveryDateForm.value.deliveryDate + 'T' + this.deliveryDateForm.value.deliveryEndHour + 'Z');
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

  cancel(){
    this.resetComponent();
  }

  initDelivery(slaughter: Slaughter, createDeliveryEvent: EventEmitter<Slaughter>) {
    this.slaughter = slaughter;
    this.delivery = new Delivery();
    this.delivery.availableBatches = [];
    this.productService.getProducts().subscribe(products => {
      products.forEach(product => {
        const batch = new Batch();
        batch.quantity = 0;
        batch.product = product;
        this.delivery.availableBatches.push(batch);
      });
    });
    this.createDeliveryEvent = createDeliveryEvent;
  }

  private resetComponent() {
    this.delivery = null;
    this.deliveryDateForm.reset();
    this.deliveryPlaceForm.reset();
    this.batchesForm.reset();
  }
}
