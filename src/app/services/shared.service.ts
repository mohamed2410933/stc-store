import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() { }
//=============================================================================================
  private productDataUpdated: BehaviorSubject<string> = new BehaviorSubject('');
   productData: Observable<string> = this.productDataUpdated.asObservable();
//=============================================================================================
  private product: BehaviorSubject<string> = new BehaviorSubject('');
   productNewData: Observable<string> = this.product.asObservable();

//=============================================================================================
  sendUpdatedProductData(data: string) {
    this.productDataUpdated.next(data);
  }
//=============================================================================================
  sendNewProductAddedToUpdate(data: string) {
    this.product.next(data);
  }
//=============================================================================================

}
