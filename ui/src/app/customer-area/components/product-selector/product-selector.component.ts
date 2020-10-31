import { EventEmitter, SimpleChanges } from '@angular/core';
import { OnChanges, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-selector',
  templateUrl: './product-selector.component.html',
  styleUrls: ['./product-selector.component.css']
})
export class ProductSelectorComponent implements OnInit {

  quantity = 0  ;

  @Output()
  changeQuantityEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  increaseQuantity(){
    this.quantity += 1;
    this.changeQuantityEvent.emit(this.quantity);
  }

  decreaseQuantity(){
    this.quantity -= 1;
    this.changeQuantityEvent.emit(this.quantity);
  }

}
