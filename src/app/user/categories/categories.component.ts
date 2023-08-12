import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
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
      public originalProducts: any[] = [];
      public listView: boolean = false;
      public selectedSortOption: string | undefined;
      public productsLengthValue: any
      public selectedCategory: any = ""
      public categoryImages = [
        { name: 'electronics', imageSrc: '../../../assets/images/electronics.jpg' },
        { name: 'jewelery', imageSrc: '../../../assets/images/jewelry.jpg' },
        { name: "men's clothing", imageSrc: '../../../assets/images/mens.jpg' },
        { name: "women's clothing", imageSrc: '../../../assets/images/womens.jpg' }
      ];
  //#endregion
  constructor(
    private productService: ProductsService,
    private categoriesService: CategoriesService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}
  //=============================================================================================
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
        this.selectedCategory = "";
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
    this.selectedCategory = category;
    this.productService.getProductsByCategory(category).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.products = data;
      })
  }
  //=============================================================================================
  changeProductView(value: any) {
    this.listView = value;
  }
  //=============================================================================================
  sortProducts() {
    switch (this.selectedSortOption) {
      case 'Title A - Z':
        this.products.sort((a: any, b: any) => a.title.localeCompare(b.title));
        break;
      case 'Title Z - A':
        this.products.sort((a: any, b: any) => b.title.localeCompare(a.title));
        break;
      case 'Price : low to high':
        this.products.sort((a: any, b: any) => a.price - b.price);
        break;
      case 'Price : high to low':
        this.products.sort((a: any, b: any) => b.price - a.price);
        break;
      case 'Rating : low to high':
        this.products.sort((a: any, b: any) => (a.rating?.rate || 0) - (b.rating?.rate || 0));
        break;
      case 'Rating : high to low':
        this.products.sort((a: any, b: any) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      default:
        // Do nothing for the "-- None --" option
        this.products = [...this.originalProducts];
        break;
    }
  }
  
  //=============================================================================================

}
