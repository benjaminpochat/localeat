import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductTemplate } from 'src/app/commons/models/product-template.model';
import { Product } from 'src/app/commons/models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Output()
  saveProductEvent = new EventEmitter<Product>();

  @Output()
  saveProductTemplateEvent = new EventEmitter<ProductTemplate>();

  product: ProductTemplate | Product;
  productForm: FormGroup;
  photoUrl: any;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.initProductForm();
  }

  setProduct(product: Product | ProductTemplate) {
    this.product = product;
    this.productForm.setValue(product);
  }

  initProductForm(){
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      unitPrice: ['', [Validators.required]],
      netWeight: ['', [Validators.required]],
    });
  }

  cancel(): void {
    this.product = null;
    this.productForm.reset();
  }

  save(): void {
    this.product.name = this.productForm.value.name;
    this.product.description = this.productForm.value.description;
    this.product.unitPrice = this.productForm.value.unitPrice;
    this.product.netWeight = this.productForm.value.netWeight;

    const saveProduct = product => {
      if (this.product instanceof Product) {
        return this.productService.saveProduct(product);
      } else {
        return this.productService.saveProductTemplate(product);
      }
    };

    const emitSaveProductEvent = product => {
      if (this.product instanceof Product) {
        this.saveProductEvent.emit(product);
      } else {
        this.saveProductTemplateEvent.emit(product);
      }
    };

    saveProduct(this.product).subscribe(product => {
      emitSaveProductEvent(product);
      this.productForm.reset();
      this.product = null;
    });
  }

  uploadPhoto() {
    const inputNode: any = document.querySelector('#file');
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.product.photo = e.target.result;
    };

    reader.readAsDataURL(inputNode.files[0]);
  }
}