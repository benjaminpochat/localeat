import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/commons/models/product.model';
import { UrlService } from 'src/app/commons/services/url.service';

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

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.urlService.getAuthenticatedUrl(['products']));
  }
}
