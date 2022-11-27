import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
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

  @ViewChild('shapingSelector')
  shapingSelector: ElementRef;

  @Output()
  saveProductEvent = new EventEmitter<Product>();

  @Output()
  saveProductTemplateEvent = new EventEmitter<ProductTemplate>();

  product: ProductTemplate | Product;
  pieceCategoryPercentages: Map<PieceCategory, number>;
  pieceCategoryShapings: Map<PieceCategory, Shaping[]>;
  productForm: FormGroup;
  photoUrl: any;
  productFormTitle: string;
  userAlert: string;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.initProductForm();
  }

  async initPieceCategoryShapingTable() {
    this.pieceCategoryPercentages = await this.productService.getPieceCategoryPercentages()
    this.pieceCategoryShapings = await this.productService.getPieceCategoryShapings()
    this.createPieceCategoryShapingTable()
    Array.from(this.product.elements.keys()).forEach(pieceCategory => {
      const shaping = this.product.elements.get(pieceCategory);
      const element = document.querySelector(`div.${pieceCategory}-shapings.${shaping}`);
      this.selectShaping(pieceCategory, shaping, element);
    })
  }

  private createPieceCategoryShapingTable() {
    const nbOfPieceCategories = this.getPieceCategories().length;
    const nbOfShapings = this.getShapings().length;
    this.renderer.setStyle(this.shapingSelector.nativeElement, 'grid-template-columns', '3fr 1fr ' + '1fr '.repeat(nbOfShapings));
    const emptyDiv = this.renderer.createElement('div');
    this.renderer.setStyle(emptyDiv, 'grid-column', '1/3');
    this.renderer.setStyle(emptyDiv, 'grid-row', '1/3');
    this.renderer.appendChild(this.shapingSelector.nativeElement, emptyDiv);
    this.getShapings().forEach(shaping => {
      this.createShapingHeaderDiv(shaping);
    });
    this.getShapings().forEach(shaping => {
      this.createShapingQuantityHeaderDiv(shaping);
    });
    this.getPieceCategories().forEach(pieceCategory => {
      this.createPieceCategoryDiv(pieceCategory);
      this.createPieceCategoryQuantityDiv(pieceCategory);
      this.getShapings().forEach(shaping => {
        this.createPieceCategoryShapingDiv(pieceCategory, shaping);
      });
    });
  }

  private createShapingHeaderDiv(shaping: Shaping) {
    const shapingHeader = this.renderer.createElement('div');
    this.renderer.addClass(shapingHeader, 'shaping-header-' + shaping);
    const shapingHeaderContent = this.renderer.createText(ShapingUtils.getShapingLabel(shaping));
    this.renderer.appendChild(shapingHeader, shapingHeaderContent);
    this.renderer.appendChild(this.shapingSelector.nativeElement, shapingHeader);
  }

  private createShapingQuantityHeaderDiv(shaping: Shaping) {
    const shapingQuantityHeader = this.renderer.createElement('div');
    this.renderer.addClass(shapingQuantityHeader, 'shaping-header-quantity-' + shaping);
    this.renderer.appendChild(this.shapingSelector.nativeElement, shapingQuantityHeader);
  }

  private createPieceCategoryDiv(pieceCategory: PieceCategory) {
    const divPieceCategory = this.renderer.createElement('div');
    const divPieceCategoryContent = this.renderer.createText(PieceCategoryUtils.getPieceCategoryLabel(pieceCategory));
    this.renderer.appendChild(divPieceCategory, divPieceCategoryContent);
    this.renderer.addClass(divPieceCategory, 'pieceCategory');
    this.renderer.appendChild(this.shapingSelector.nativeElement, divPieceCategory);
  }

  createPieceCategoryQuantityDiv(pieceCategory: PieceCategory) {
    const divPieceCategoryQuantity = this.renderer.createElement('div');
    const pieceCategoryWeight = (this.product.netWeight || 0) * this.pieceCategoryPercentages[pieceCategory];
    const divPieceCategoryQuantityContent = this.renderer.createText(pieceCategoryWeight.toFixed(2) + ' kg');
    this.renderer.addClass(divPieceCategoryQuantity, 'piece-category-quantity-' + pieceCategory);
    this.renderer.appendChild(divPieceCategoryQuantity, divPieceCategoryQuantityContent);
    this.renderer.appendChild(this.shapingSelector.nativeElement, divPieceCategoryQuantity);
  }

  private createPieceCategoryShapingDiv(pieceCategory: PieceCategory, shaping: Shaping) {
    const divShaping = this.renderer.createElement('div');
    if (this.pieceCategoryShapings[pieceCategory].includes(shaping)){
      this.renderer.addClass(divShaping, 'shaping');
      this.renderer.addClass(divShaping, pieceCategory + '-shapings');
      this.renderer.addClass(divShaping, shaping);
      if (this.product.elements.get(pieceCategory) === shaping) {
        this.renderer.addClass(divShaping, 'shaping--selected');
      }
      this.renderer.listen(divShaping, 'click', (event) => this.selectShaping(pieceCategory, shaping, divShaping));
    }
    this.renderer.appendChild(this.shapingSelector.nativeElement, divShaping);
  }

  selectShaping(pieceCategory: PieceCategory, shaping: Shaping, divShaping: Element): void {
    this.product.elements.set(pieceCategory, shaping);
    document.querySelectorAll('.' + pieceCategory + '-shapings').forEach(element => {
      this.renderer.removeClass(element, 'shaping--selected');
      element.textContent = null;
    });
    this.renderer.addClass(divShaping, 'shaping--selected');
    const pieceCategoryWeight = (this.product.netWeight || 0) * this.pieceCategoryPercentages[pieceCategory];
    divShaping.textContent = pieceCategoryWeight.toFixed(2) + ' kg';
    this.updateAllShapingsHeadersQuantityValues();
  }

  private updateAllShapingsHeadersQuantityValues() {
    Object.values(Shaping).filter(shaping => shaping !== Shaping.Undefined).forEach(shaping => {
      var shapingTotalWeight = 0;
      this.product.elements.forEach((currentShaping, pieceCategory, map) => {
        if (currentShaping === shaping) {
          shapingTotalWeight += this.product.netWeight * this.pieceCategoryPercentages[pieceCategory];
        }
      });
      document.querySelector('.shaping-header-quantity-' + shaping).textContent = shapingTotalWeight.toFixed(2);
    });
  }

  initNewProductTemplate() {
    this.productFormTitle = "Créons un nouveau colis type";
    this.product = new ProductTemplate();
    this.product.elements = new Map<PieceCategory, Shaping>();
    this.initPieceCategoryShapingTable();
  }

  initProductTemplate(productTemplate: ProductTemplate) {
    this.productFormTitle = "Editons un colis type existant";
    this.product = productTemplate;
    this.initProductForm()
    this.initPieceCategoryShapingTable();
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
  }

  initProductForm(){
    this.productForm = this.formBuilder.group({
      name: new FormControl(this.product?.name, Validators.required),
      description: new FormControl(this.product?.description, [Validators.required, Validators.maxLength(255)]),
      unitPrice: new FormControl(this.product?.unitPrice, Validators.required),
      netWeight: new FormControl(this.product?.netWeight, Validators.required),
    });
    this.productForm.valueChanges.subscribe(form => {
      if (this.product) {
        this.product.netWeight = form.netWeight;
        this.getPieceCategories().forEach(pieceCategory => {
          const pieceCategoryQuantity = this.product.netWeight * this.pieceCategoryPercentages[pieceCategory];
          const divPieceCategoryQuantity = this.shapingSelector.nativeElement.querySelector('.' + 'piece-category-quantity-' + pieceCategory);
          divPieceCategoryQuantity.textContent = `${pieceCategoryQuantity.toFixed(2)} kg`;
          this.getShapings().forEach(shaping => {
            const selectedShapingElement = document.querySelector(`.${pieceCategory}-shapings.${shaping}.shaping--selected`)
            if (selectedShapingElement) {
              const selectedShapingQuantity = (this.product.netWeight || 0) * this.pieceCategoryPercentages[pieceCategory];
              selectedShapingElement.textContent = `${selectedShapingQuantity.toFixed(2)} kg`
            }
          })
          this.updateAllShapingsHeadersQuantityValues();
        })
      }
    })
  }

  cancel(): void {
    this.product = null;
    this.productForm.reset();
  }

  save(): void {
    if (this.productForm.valid && this.isShapingDefined()) {
      this.userAlert = undefined;
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
    } else {
      var alerts = [];
      if (!this.isShapingDefined()) {
        alerts.push('Veuillez définir une forme de découpe pour chaque partie de l\'animal.');
      } 
      if (!this.productForm.valid){
        alerts.push['Veuillez vérifier les informations saisies.'];
      }
      this.userAlert = alerts.join('\n');
    }
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

  getPieceCategories(): PieceCategory[] {
    return Object.keys(PieceCategory).map(key => PieceCategory[key]);
  }

  getPieceCategoryLabel(pieceCategory : PieceCategory): string {
    return PieceCategoryUtils.getPieceCategoryLabel(pieceCategory);
  }

  getShapings(): Shaping[] {
    return Object.keys(Shaping).map(key => Shaping[key]).filter(shaping => shaping != Shaping.Undefined);
  }

  getShapingLabel(shaping: Shaping): string {
    return ShapingUtils.getShapingLabel(shaping);
  }

  isShapingDefined(): boolean {
    return Object.values(PieceCategory).every(pieceCategory => this.product.elements?.get(pieceCategory))
  }
}

