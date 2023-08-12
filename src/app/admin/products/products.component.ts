
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'src/app/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/shared/modals/delete-modal/delete-modal.component';
import { ToastrService } from 'ngx-toastr';
/**
 * @title Table with pagination
 */

//#region  Interfaces 
    export interface Product {
      id: number;
      image:string;
      title: string;
      price: number;
      category: string;
      action:string;
    }

//#endregion

 const ELEMENT_DATA: Product[] = [];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements AfterViewInit {
  //#region  Public VAriables
    public displayedColumns: string[] = ['id', 'image', 'title', 'price', 'category', 'action'];
    public products:any =[]
    public dataSource = new MatTableDataSource<Product>(ELEMENT_DATA);
    public dataSubscreption:any
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    public pageSize =0
   //#endregion
  constructor(
      private productService: ProductsService,
      private router : Router,
      private spinner: NgxSpinnerService,
      private sharedService:SharedService,
      private dialog: MatDialog,
      private toastr: ToastrService
    ) {}
//=============================================================================================
  ngAfterViewInit() {
    this.getData()
    this.dataSource.paginator = this.paginator;
  }
//=============================================================================================
  getData() {
   this.dataSubscreption =  this.sharedService.productDataObject.subscribe((response : any) => {
      (response && response.id) ?  this.getAllProducts(response)  :  this.getAllProducts() 
    });
  }
//=============================================================================================
  getAllProducts(productUpdated?:any , limit?:number) {
    this.spinner.show();
    this.productService.getProducts(limit).subscribe(
      (data:any) => {
        this.spinner.hide()
        this.products = data;
        if(productUpdated){
          const productIndex = this.products.findIndex((product:any) => product.id === productUpdated.id);
              if (productIndex !== -1) {
                  this.products[productIndex] = productUpdated;
                this.dataSource = new MatTableDataSource<Product>(this.products);
              }else{
                this.products.push(productUpdated)
                this.dataSource = new MatTableDataSource<Product>(this.products);
              }
              this.dataSubscreption.unsubscribe()
        }else{
          this.dataSource = new MatTableDataSource<Product>(this.products);
        }
      },
      (error) => {
         this.toastr.error('Error fetching products' , error);
      }
    );
  }
//=============================================================================================
   //Initiates navigation to Add/Edit Product page in admin section.
  openAddProductPage(){
     this.router.navigate(['/admin/product-operations'])
  }
//=============================================================================================
    //Updates product and navigates to Edit page with product's ID.
  onEditProduct(product: any) {
    this.sharedService.sendNewProductAddedToUpdate(product)
    this.router.navigate(['/admin/product-operations/' + product.id])
  }
//=============================================================================================
   // Initiates deletion confirmation modal; continues on user confirmation, deleting product.
  openDeletePopip(product: any) {
      const dialogRef = this.dialog.open(DeleteModalComponent, {
        width: '400px',
        data: {},
      });
      dialogRef.afterClosed().subscribe((res) => {
        if(res){
         
          this.deleteProduct(product)
        }
      });
    }
//=============================================================================================
   deleteProduct(productData: any) {
      this.productService.deleteProduct(productData.id)
        .subscribe(
          (response) => {
             this.toastr.success('Product deleted Succssfly');
             this.products = this.products.filter((p : any) =>p.id != productData.id)    
             this.dataSource = new MatTableDataSource<Product>(this.products);
          },
          (error) => {
               this.toastr.error('Error fetching products' , error);
          }
        );
    }
//=============================================================================================
    // handlePageChange(event: any) {
    //   this.pageSize = event.pageSize;
    //   this.getAllProducts('',this.pageSize);
    // }
    
}






