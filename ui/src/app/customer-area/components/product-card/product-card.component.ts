import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/commons/models/order.model';
import { Product } from 'src/app/commons/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()
  product: Product;

  @Input()
  order: Order;

  image: any;

  constructor() { }

  ngOnInit(): void {
    this.createImageFromBlob(this.product.photo as Blob);
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
       this.image = reader.result;
    }, false);
    if (image) {
       reader.readAsDataURL(image);
    }
 }
}
