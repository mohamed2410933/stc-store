import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://fakestoreapi.com/products';
  constructor(private http: HttpClient) { }
//=============================================================================================
  getProducts() {
    const params = new HttpParams().set('limit', '20');
    return this.http.get(this.apiUrl, { params });
  }
//=============================================================================================
  createProduct(product: any){
    return this.http.post<any>(this.apiUrl, product);
  }
//=============================================================================================
  getProductById(productId: number){
    return this.http.get<any>(`${this.apiUrl}/${productId}`);
  }
//=============================================================================================
  getProductByCategory(categoryName: string){
    return this.http.get<any>(`${this.apiUrl}/category/${categoryName}`);
  }
//=============================================================================================
  updateProduct(productId: number, productData: any){
    const url = `${this.apiUrl}/${productId}`;
    return this.http.put<any>(url, productData);
  }
//=============================================================================================
  deleteProduct(productId: number) {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete<any>(url); 
  }
//=============================================================================================


  
}
