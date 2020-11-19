import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductTemplate } from 'src/app/commons/models/product-template.model';
import { Product } from 'src/app/commons/models/product.model';
import { ProductTemplateService } from '../../services/product-template.service';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-template-creation.component.html',
  styleUrls: ['./product-template-creation.component.css']
})
export class ProductTemplateCreationComponent implements OnInit {

  @Output() createProductEvent = new EventEmitter<Product>();
  productTemplate: ProductTemplate;
  productTemplateCreationForm: FormGroup;
  photoUrl: any;

  constructor(
    private formBuilder: FormBuilder,
    private productTemplateService: ProductTemplateService) { }

  ngOnInit(): void {
    this.initProductCreationForm();
  }

  initProductCreationForm(){
    this.productTemplateCreationForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      unitPrice: ['', [Validators.required]],
      netWeight: ['', [Validators.required]],
    });
  }

  cancel(): void {
    this.productTemplate = null;
    this.productTemplateCreationForm.reset();
  }

  save(): void {
    this.productTemplate.name = this.productTemplateCreationForm.value.name;
    this.productTemplate.description = this.productTemplateCreationForm.value.description;
    this.productTemplate.unitPrice = this.productTemplateCreationForm.value.unitPrice;
    this.productTemplate.netWeight = this.productTemplateCreationForm.value.netWeight;

    this.productTemplateService.saveProductTemplate(this.productTemplate).subscribe(productTemplate => {
      this.createProductEvent.emit(productTemplate);
      this.productTemplateCreationForm.reset();
      this.productTemplate = null;
    });
  }

  uploadPhoto() {
    const inputNode: any = document.querySelector('#file');
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.productTemplate.photo = e.target.result;
    };

    reader.readAsDataURL(inputNode.files[0]);
  }
}
