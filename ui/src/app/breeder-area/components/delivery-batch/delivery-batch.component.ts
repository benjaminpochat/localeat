import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Batch } from 'src/app/commons/models/batch.model';
import { Product } from 'src/app/commons/models/product.model';

@Component({
  selector: 'app-delivery-batch',
  templateUrl: './delivery-batch.component.html',
  styleUrls: ['./delivery-batch.component.css']
})
export class DeliveryBatchComponent implements OnInit {

  @Input()
  batch: Batch;

  @Output()
  changeProductEvent = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  }

  addProducts(n: number){
    this.batch.quantity = this.batch.quantity + n;
  }

  removeProducts(n: number) {
    this.batch.quantity = Math.max(0, this.batch.quantity - n);
  }

  changeProduct() {
    this.changeProductEvent.emit(this.batch.product);
  }
}
