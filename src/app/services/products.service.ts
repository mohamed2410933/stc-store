import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://fakestoreapi.com/products';
//==========================================================================================
  constructor(private http: HttpClient) {}
//==========================================================================================
  getProducts(limit?: number): Observable<any> {
    const params = new HttpParams().set('limit', limit ? limit.toString() : '');
    return this.http.get(this.apiUrl, { params });
  }
//==========================================================================================
  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }
//==========================================================================================
  getProductById(productId: number): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<any>(url);
  }
//==========================================================================================
  getProductsByCategory(categoryName: string): Observable<any> {
    const url = `${this.apiUrl}/category/${categoryName}`;
    return this.http.get<any>(url);
  }
//==========================================================================================
  updateProduct(productId: number, productData: any): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.put<any>(url, productData);
  }
//==========================================================================================
  deleteProduct(productId: number): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete<any>(url);
  }
}
