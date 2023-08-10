import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent  implements OnInit{
 
   @Input() products: any
    
constructor(private router: Router,){}
   ngOnInit(): void {
  }
//=============================================================================================
  goToProductDetailsPage(product: any) {
    this.router.navigate([`/user/product-details/${product.id}`])
  }
}
