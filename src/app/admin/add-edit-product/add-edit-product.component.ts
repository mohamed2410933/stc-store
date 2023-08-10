import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
  //#region  Public Variables
   @ViewChild('fileInput') el!: ElementRef;
      public imageUrl: any = "https://i.ibb.co/fDWsn3G/buck.jpg";
      public editFile: boolean = true;
      public product :any = {}
      public productId : number = 0;
      public removeUpload: boolean = false;
      public categories : any = [];
      public productForm!: FormGroup 
      public submitted = false;
  //#endregion

  constructor(
      private formBuilder: FormBuilder , 
      private productsService:ProductsService,
      private spinner: NgxSpinnerService,
      private router: Router,
      private actRoute: ActivatedRoute,
      private sharedService:SharedService,
      private categoriesService:CategoriesService,
      private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.productId = this.actRoute.snapshot.params['id'];
    this.productId ? this.getProductById(this.productId) : ''
    this.createProductForm();
    this.getCategories();

  }
//=============================================================================================
  createProductForm(data?:any){
    this.productForm = this.formBuilder.group(
      {
        title: [data ? data.title : '', Validators.required],
        price: [data ? data.price : '',[Validators.required]],
        description: [data ? data.description : '', [Validators.required]],
        image: [data ? this.imageUrl = data.image : this.imageUrl, Validators.required],
        category: [data ? data.category : '', Validators.required],
      },
    );
  }
//=============================================================================================
  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }
//=============================================================================================
  onSubmit(): void {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.spinner.show();
    if (!this.productId) {
      this.productForm.value.image = this.imageUrl
      this.productsService.createProduct(this.productForm.value).subscribe((result: any) => {
        this.spinner.hide();
        if (result) {
          this.toastr.success('Product Created Succssfly');
          this.sharedService.sendUpdatedProductData(result);
          this.router.navigate(['admin/products'])
          this.onReset();
        }
      }, error => {
        this.toastr.error('error' , error);
      })
    } else {
      this.productForm.value.image = this.imageUrl
      this.productsService.updateProduct(this.productId, this.productForm.value).subscribe((result: any) => {
        this.spinner.hide();
        if (result) {
          this.toastr.success('Product Updated Succssfly');
          this.sharedService.sendUpdatedProductData(result);
          this.router.navigate(['admin/products'])
          this.onReset();
        }
      }, error => {
        this.toastr.error('error' , error);
      })
    }
  }
//=============================================================================================
  onReset(): void {
    this.submitted = false;
    this.imageUrl="https://i.ibb.co/fDWsn3G/buck.jpg";
    this.productForm.reset();
  }
//=============================================================================================
  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    
    if (event.target.files && event.target.files[0]) {
      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          const base64String = reader.result.split(',')[1]; // Extract base64 data
  
          // Convert base64 data to bytes and calculate size
          const fileSizeInBytes = (base64String.length * 3) / 4 - (base64String.endsWith('==') ? 2 : base64String.endsWith('=') ? 1 : 0);
          const fileSizeInKB = fileSizeInBytes / 1024;
  
          if (fileSizeInKB <= 100) {
            this.imageUrl = reader.result;
          } else {
            // Handle validation error for size greater than 100 KB
            // console.log("Image size exceeds 100 KB.");
            this.toastr.error("Image size too large. Please try uploading a smaller image.");
          }
        }
      };
  
      reader.readAsDataURL(file);
    }
  }
//=============================================================================================
  goBack(): void {
    this.router.navigate(['/admin/products']);
  }
//=============================================================================================
  getProductById(productId:number){
    this.productsService.getProductById(productId).subscribe(
      (product) => {
        if(product){
          this.product = product;
          this.createProductForm(this.product)
          console.log(this.product);
        }else{
          this.sharedService.productNewData.subscribe(respons=>{
            this.product = respons;
            this.createProductForm(this.product)
          })
        }
      },
      (error) => {
        this.toastr.error('Error fetching product:', error);
      }
    );
  }
//=============================================================================================
  getCategories(){
    this.categories =  this.categoriesService.getCategories()
  }
}


