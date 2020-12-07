import { EventEmitter, Input, SimpleChanges } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-selector',
  templateUrl: './product-selector.component.html',
  styleUrls: ['./product-selector.component.css']
})
export class ProductSelectorComponent implements OnInit {

  @Input()
  quantityAvailable;
  quantityOrdered = 0 ;

  @Output()
  changeQuantityEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  isIncreaseQuantityPossible(): boolean {
    return this.quantityAvailable > this.quantityOrdered;
  }

  getButtonLabel(): string {
    if (this.isIncreaseQuantityPossible) {
      return 'Ajouter ce produit à la commande';
    }
    return 'Ce produit n\'est plus disponible';
  }

  increaseQuantity(){
    if(this.isIncreaseQuantityPossible()){
      this.quantityOrdered += 1;
      this.changeQuantityEvent.emit(this.quantityOrdered);
    }
  }

  decreaseQuantity(){
    this.quantityOrdered -= 1;
    this.changeQuantityEvent.emit(this.quantityOrdered);
  }

}
