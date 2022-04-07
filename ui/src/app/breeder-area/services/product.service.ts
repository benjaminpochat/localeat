import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductTemplate, ProductTemplateUtils } from 'src/app/commons/models/product-template.model';
import { Product } from 'src/app/commons/models/product.model';
import { Image } from 'src/app/commons/models/image.model';
import { UrlService } from 'src/app/commons/services/url.service';
import { map } from 'rxjs/operators';
import { PieceCategory } from 'src/app/commons/models/piece-category.model';
import { Shaping } from 'src/app/commons/models/shaping.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private urlService: UrlService
  ) { }

  saveProduct(product: Product): Observable<Product> {
    this.convertMapEntriesToAttributes(product.elements);
    return this.http.post<Product>(this.urlService.getAuthenticatedUrl(['products']), product);
  }

  saveProductTemplate(product: ProductTemplate): Observable<ProductTemplate> {
    this.convertMapEntriesToAttributes(product.elements)
    return this.http.post<ProductTemplate>(this.urlService.getAuthenticatedUrl(['productTemplates']), product);
  }
  
  private convertMapEntriesToAttributes(map: Map<string, Object>) {
    for (let entry of map.entries()) {
      if (entry[0]) {
        map[entry[0]] = entry[1];
      }
    }
  }

  public getProductTemplates(): Observable<ProductTemplate[]> {
    return this.http.get<ProductTemplate[]>(this.urlService.getAuthenticatedUrl(['productTemplates']))
      .pipe(map((productTemplates: ProductTemplate[]) => {
          (<ProductTemplate[]>productTemplates).forEach(
            productTemplate => {
              const elementsAsArrays = Object.entries(productTemplate.elements);
              productTemplate.elements = new Map<PieceCategory, Shaping>();
              elementsAsArrays.forEach(elementAsArrays => ProductTemplateUtils.setShaping(productTemplate, elementAsArrays[0], elementAsArrays[1]));
            });
          return productTemplates;
      }));
  }

  //TODO : à déplacer dans commons
  loadProductPhoto(product: Product): Observable<Image> {
    if (product.id){
      return this.http.get<Image>(this.urlService.getAnonymousUrl(['products', String(product.id), 'photo']));
    }
  }

  loadProductTemplatePhoto(productTemplate: ProductTemplate): Observable<Image> {
    return this.http.get<Image>(this.urlService.getAuthenticatedUrl(['productTemplates', productTemplate.id.toString(), 'photo']));
  }

  async getPieceCategoryPercentages(): Promise<Map<PieceCategory, number>> {
    return this.http.get<Map<PieceCategory, number>>(this.urlService.getAnonymousUrl(['piececategories', 'percentages'])).toPromise();
  }

  async getPieceCategoryShapings(): Promise<Map<PieceCategory, Shaping[]>> {
    return this.http.get<Map<PieceCategory, Shaping[]>>(this.urlService.getAnonymousUrl(['piececategories', 'shapings'])).toPromise();
  }
}
