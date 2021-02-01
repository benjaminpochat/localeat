import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Batch } from 'src/app/commons/models/batch.model';
import { Product } from 'src/app/commons/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input()
  product: Product;

  constructor(private sanitizer: DomSanitizer) { }

  getPrductDescrption(): string {
    return this.product.description.replace(new RegExp('\n', 'g'), '<br/>');
  }

  ngOnInit(): void {
  }

}
