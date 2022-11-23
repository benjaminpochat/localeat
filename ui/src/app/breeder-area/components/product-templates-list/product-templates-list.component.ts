import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductTemplate } from 'src/app/commons/models/product-template.model';
import { ProductService } from 'src/app/breeder-area/services/product.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-product-templates-list',
  templateUrl: './product-templates-list.component.html',
  styleUrls: ['./product-templates-list.component.css']
})

export class ProductTemplatesListComponent implements OnInit {

  productTemplates: ProductTemplate[];

  @ViewChild(ProductComponent)
  productComponent: ProductComponent;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.refreshProductTemplatesList();
  }

  showProductTemplate(product: ProductTemplate) {
    this.productComponent.initProductTemplate(product)
  }

  showProductTemplateCreation() {
    this.productComponent.initNewProductTemplate();
  }

  refreshProductTemplatesList() {
    this.productService.getProductTemplates().subscribe(productTemplates => this.productTemplates = productTemplates);
  }

  getProductDescription(productDescription: string): string {
    return productDescription?.replace(new RegExp('\n', 'g'), '<br/>');
  }
}
