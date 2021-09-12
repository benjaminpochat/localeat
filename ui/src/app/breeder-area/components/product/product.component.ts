import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductTemplate } from 'src/app/commons/models/product-template.model';
import { Product } from 'src/app/commons/models/product.model';
import { ProductService } from 'src/app/breeder-area/services/product.service';
import { Image } from 'src/app/commons/models/image.model';
import { PieceCategory, PieceCategoryUtils } from 'src/app/commons/models/piece-category.model';
import { Shaping, ShapingUtils } from 'src/app/commons/models/shaping.model';

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
    this.productForm.patchValue(product);
    if(this.product.photo) {
      if (this.product instanceof Product) {
        this.productService.loadProductPhoto(this.product).subscribe(photo => this.product.photo = photo);
      } else {
        this.productService.loadProductTemplatePhoto(this.product).subscribe(photo => this.product.photo = photo);
      }
    }
    this.product.elements = new Map<PieceCategory, Shaping>();
    Object.keys(PieceCategory).forEach(pieceCategory => this.product.elements[pieceCategory] = null);
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

    const saveProduct: (
        (product: Product) => Observable<Product>)
        | ((product: ProductTemplate) => Observable<ProductTemplate>
      ) = product => {
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

  uploadPhoto():void {
    const inputNode: any = document.querySelector('#file');
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.product.photo = new Image();
      this.product.photo.content = e.target.result;
    };

    reader.readAsDataURL(inputNode.files[0]);
  }

  getPieceCategories(): string[] {
    return Object.keys(PieceCategory);
  }
}
