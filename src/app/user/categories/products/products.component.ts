import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';


//#region Interfaces
interface Product {
  id: number;
  title:string;
  price:string;
  category:string;
  image:string;
  rating: {
    rate: number;
  };
}
//#endregion

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
//#region  Public Variables
    @Input() products: Product[] = [];
    @Input() listView = false;
  //#endregion
  constructor(private router: Router) { }

  //=============================================================================================
  goToProductDetailsPage(product: Product) {
    this.router.navigate([`/user/product-details/${product.id}`])
  }
}
