import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, debounceTime, distinctUntilChanged, fromEvent, map, switchMap } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  //#region  Public Varibales
      @ViewChild("searchInput", { static: true }) searchq!: ElementRef
      public categories: any = []
      public products: any = []
      public filteredProducts: any = []
      public categorySelected: any
      public searchQuery: string = '';
      public originalProducts: any[] = []; // Initialize an array to hold the original products

  //#endregion
  constructor(
    private productService: ProductsService,

    private categoriesService: CategoriesService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService

  ) { 

  }

  ngOnInit(): void {
    this.getCategories();
    this.getAllProducts();
    this.search();
  }

  //=============================================================================================
  getAllProducts() {
    this.spinner.show();
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.spinner.hide();
        this.products = data;
        this.originalProducts = [...this.products]; // Make a copy of the original products
      },
      (error) => {
        this.toastr.error('Error fetching products', error);
      }
    );
  }
  //=============================================================================================
  search(): void {
    const searchKeywords = fromEvent(this.searchq.nativeElement, 'keyup');
    searchKeywords
      .pipe(
        debounceTime(200),
        map((event: any) => event.target.value),
        distinctUntilChanged()
      )
      .subscribe(query => {
        if (query === '') {
          this.products = [...this.originalProducts]; // Restore original products when query is empty
        } else {
          this.filteredProducts = this.filterProducts(query);
          this.products = this.filteredProducts;
        }
      });
  }
  //=============================================================================================
  filterProducts(query: string): any[] {
    if (!query) {
      return [...this.originalProducts]; // Return a copy of the original array when query is empty
    }
    return this.originalProducts.filter((product: any) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  }
  //=============================================================================================
  getCategories() {
    this.categoriesService.getCategories().subscribe((response: any) => {
      this.categories = response;
    })
  }
  //=============================================================================================
  getProductsByCategory(category: any) {
    this.spinner.show();
    this.productService.getProductByCategory(category).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.products = data;
      })
  }
 

}
