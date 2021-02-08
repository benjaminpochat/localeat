import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/breeder-area/services/product.service';
import { Image } from 'src/app/commons/models/image.model';
import { Product } from 'src/app/commons/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input()
  product: Product;

  image: Image;

  constructor(
    private productService: ProductService
  ) { }

  getProductDescription(): string {
    return this.product.description.replace(new RegExp('\n', 'g'), '<br/>');
  }

  ngOnInit(): void {
    this.productService.loadProductPhoto(this.product).subscribe(photo => this.product.photo = photo);
  }

}
