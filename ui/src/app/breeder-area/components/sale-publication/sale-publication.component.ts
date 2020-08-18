import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { DeliveryAddress } from 'src/app/commons/models/delivery-address.model';
import { Product } from 'src/app/commons/models/product.model';
import { SlaughterService } from '../../services/slaughter.service';

@Component({
  selector: 'app-sale-publication',
  templateUrl: './sale-publication.component.html',
  styleUrls: ['./sale-publication.component.css']
})
export class SalePublicationComponent implements OnInit {

  @Input()
  slaughter: Slaughter;

  @Output()
  salePublicationLoopBack = new EventEmitter<Slaughter>();

  deliveryDateForm: FormGroup;
  deliveryPlaceForm: FormGroup;
  meatWeightForm: FormGroup;
  priceForm: FormGroup;

  userAlert: string;

  constructor(
    private slaughterService: SlaughterService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initSaleForms();
  }

  initSaleForms() {
    this.deliveryDateForm = this.formBuilder.group({
      deliveryDate: [this.slaughter.cuttingDate, Validators.required],
      deliveryHour: ['18:00', Validators.required]
    });
    this.deliveryPlaceForm = this.formBuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required]
    });
    this.meatWeightForm = this.formBuilder.group({
      meatWeight: [this.slaughter.animal.liveWeight * 0.4, Validators.min(1)]
    });
    this.priceForm = this.formBuilder.group({
      price: ['', Validators.required]
    });
  }

  publishSale(){
    if (this.deliveryDateForm.valid && this.deliveryPlaceForm.valid && this.meatWeightForm.valid && this.priceForm.valid){
      this.slaughter.delivery =  new Delivery();
      this.slaughter.delivery.deliveryDate = new Date(this.deliveryDateForm.value.deliveryDate + ':' + this.deliveryDateForm.value.deliveryHour);
      this.slaughter.delivery.deliveryAddress = new DeliveryAddress();
      this.slaughter.delivery.deliveryAddress.addressLine1 = this.deliveryPlaceForm.value.address;
      this.slaughter.delivery.deliveryAddress.city = this.deliveryPlaceForm.value.city;
      this.slaughter.animal.meatWeight = this.meatWeightForm.value.meatWeight;
      const product = new Product();
      product.price = this.priceForm.value.price;
      this.slaughter.delivery.availableProducts = [];
      this.slaughter.delivery.availableProducts.push(product);
      this.slaughterService.saveSlaughter(this.slaughter, this.salePublicationLoopBack);
    } else {
      this.userAlert = 'Veuillez vérifier les informations saisies.';
    }
  }

  cancel(){
    this.salePublicationLoopBack.emit(undefined);
  }
}
