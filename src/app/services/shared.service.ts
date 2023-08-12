import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private readonly productDataSubject: BehaviorSubject<string> = new BehaviorSubject('');
  productDataObject: Observable<string> = this.productDataSubject.asObservable();
//==========================================================================================
  private readonly productSubject: BehaviorSubject<string> = new BehaviorSubject('');
  productNewData: Observable<string> = this.productSubject.asObservable();
//==========================================================================================
  constructor() {}
//==========================================================================================
  sendUpdatedProductData(data: string) {
    this.productDataSubject.next(data);
  }
//==========================================================================================
  sendNewProductAddedToUpdate(data: string) {
    this.productSubject.next(data);
  }
}
