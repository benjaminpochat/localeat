import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductTemplate } from 'src/app/commons/models/product-template.model';
import { ProductTemplateService } from '../../services/product-template.service';
import { ProductTemplateCreationComponent } from '../product-template-creation/product-template-creation.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './product-templates-list.component.html',
  styleUrls: ['./product-templates-list.component.css']
})
export class ProductTemplatesListComponent implements OnInit {

  productTemplates: ProductTemplate[];

  @ViewChild(ProductTemplateCreationComponent)
  productTemplateCreationComponent: ProductTemplateCreationComponent;

  constructor(
    private productTemplateService: ProductTemplateService
  ) { }

  ngOnInit(): void {
    this.refreshProductTemplatesList();
  }

  showProductTemplateCreation() {
    this.productTemplateCreationComponent.productTemplate = new ProductTemplate();
  }

  refreshProductTemplatesList() {
    this.productTemplateService.getProductTemplates().subscribe(productTemplates => this.productTemplates = productTemplates);
  }
}
