import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = 'https://fakestoreapi.com/products/categories';
  constructor(private http: HttpClient) { }
//=============================================================================================
  getCategories() {
    return this.http.get(this.apiUrl);
  }
}
