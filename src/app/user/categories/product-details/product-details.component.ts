import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  //#region  Public Variables
    public product:any;
    public productId:number=0;
  //#endregion

  constructor(
    private productsService:ProductsService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private toastr: ToastrService
  ){}
  ngOnInit(): void {
    this.productId = this.actRoute.snapshot.params['id'];
    this.getProductById(this.productId);
  }
  //=============================================================================================
  getProductById(productId:number){
    this.spinner.show();
    this.productsService.getProductById(productId).subscribe(
      (product) => {
    this.spinner.hide();
        if(product){
          this.product = product;
          console.log(this.product);
        }
      },
      (error) => {
        this.toastr.error('Error fetching product:', error);
      }
    );
  }
  //=============================================================================================
  goBack(): void {
    this.router.navigate(['/user/categories']);
  }
  //=============================================================================================

}
