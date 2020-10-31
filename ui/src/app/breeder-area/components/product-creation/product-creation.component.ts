import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/commons/models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent implements OnInit {

  @Output() createProductEvent = new EventEmitter<Product>();
  product: Product;
  productCreationForm: FormGroup;
  photoUrl: any;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.initProductCreationForm();
  }

  initProductCreationForm(){
    this.productCreationForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      unitPrice: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    });
  }

  cancel(): void {
    this.product = null;
    this.productCreationForm.reset();
  }

  save(): void {
    this.product.name = this.productCreationForm.value.name;
    this.product.description = this.productCreationForm.value.description;
    this.product.unitPrice = this.productCreationForm.value.unitPrice;
    this.product.quantity = this.productCreationForm.value.quantity;

    this.productService.saveProduct(this.product).subscribe(product => {
      this.createProductEvent.emit(product);
      this.productCreationForm.reset();
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
