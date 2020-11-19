import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductTemplate } from 'src/app/commons/models/product-template.model';
import { Product } from 'src/app/commons/models/product.model';
import { UrlService } from 'src/app/commons/services/url.service';

@Injectable({
  providedIn: 'root'
})
export class ProductTemplateService {

  constructor(
    private http: HttpClient,
    private urlService: UrlService
  ) { }

  saveProductTemplate(product: ProductTemplate): Observable<ProductTemplate> {
    return this.http.post<Product>(this.urlService.getAuthenticatedUrl(['productTemplates']), product);
  }

  public getProductTemplates(): Observable<ProductTemplate[]> {
    return this.http.get<ProductTemplate[]>(this.urlService.getAuthenticatedUrl(['productTemplates']));
  }
}
