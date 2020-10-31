import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/commons/models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductCreationComponent } from '../product-creation/product-creation.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[];

  @ViewChild(ProductCreationComponent)
  productCreationComponent: ProductCreationComponent;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.refreshProductsList();
  }

  showProductCreation() {
    this.productCreationComponent.product = new Product();
  }

  refreshProductsList() {
    this.productService.getProducts().subscribe(products => this.products = products);
  }
}
