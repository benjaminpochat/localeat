import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductTemplate } from 'src/app/commons/models/product-template.model';
import { Product } from 'src/app/commons/models/product.model';
import { Image } from 'src/app/commons/models/image.model';
import { UrlService } from 'src/app/commons/services/url.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private urlService: UrlService
  ) { }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.urlService.getAuthenticatedUrl(['products']), product);
  }

  saveProductTemplate(product: ProductTemplate): Observable<ProductTemplate> {
    return this.http.post<ProductTemplate>(this.urlService.getAuthenticatedUrl(['productTemplates']), product);
  }

  public getProductTemplates(): Observable<ProductTemplate[]> {
    return this.http.get<ProductTemplate[]>(this.urlService.getAuthenticatedUrl(['productTemplates']));
  }

  //TODO : à déplacer dans commons
  loadProductPhoto(product: Product): Observable<Image> {
    if (product.id){
      return this.http.get<Image>(environment.localeatCoreUrl + '/products/' + product.id + '/photo');
    }
  }

  loadProductTemplatePhoto(productTemplate: ProductTemplate): Observable<Image> {
    return this.http.get<Image>(this.urlService.getAuthenticatedUrl(['productTemplates', productTemplate.id.toString(), 'photo']));
  }

}
