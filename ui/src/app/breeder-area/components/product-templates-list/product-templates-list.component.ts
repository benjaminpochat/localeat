import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductTemplate } from 'src/app/commons/models/product-template.model';
import { ProductService } from '../../services/product.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './product-templates-list.component.html',
  styleUrls: ['./product-templates-list.component.css']
})
// TODO : This component is not used aynmore. To be deleted is really obsolete.
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

  showProductTemplateCreation() {
    this.productComponent.product = new ProductTemplate();
  }

  refreshProductTemplatesList() {
    this.productService.getProductTemplates().subscribe(productTemplates => this.productTemplates = productTemplates);
  }
}
