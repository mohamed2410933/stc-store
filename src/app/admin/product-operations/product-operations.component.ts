
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-product-operations',
  templateUrl: './product-operations.component.html',
  styleUrls: ['./product-operations.component.scss']
})
export class ProducOperationstComponent implements OnInit {

  //#region  Public Variables
    @ViewChild('fileInput') el!: ElementRef;
    public imageUrl: any = "assets/images/image-uplaod.jpg";
    public editFile: boolean = true;
    public product: any = {};
    public productId: number = 0;
    public removeUpload: boolean = false;
    public categories: any = [];
    public productForm!: FormGroup;
    public submitted = false;
//#endregion
  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private sharedService: SharedService,
    private categoriesService: CategoriesService,
    private toastr: ToastrService
  ) {}
 //=============================================================================================
  ngOnInit(): void {
    this.productId = this.actRoute.snapshot.params['id'];
    if (this.productId) {
      this.getProductById(this.productId);
    }
    this.initProductForm();
    this.getCategores();
  }
 //=============================================================================================
  private initProductForm(data?: any): void {
    console.log(data);
    
    this.productForm = this.formBuilder.group({
      title: [data?.title || '', Validators.required],
      price: [data?.price || '', [Validators.required]],
      description: [data?.description || '', [Validators.required]],
      image: [data ? this.imageUrl = data.image : this.imageUrl, Validators.required],
      category: [data?.category || '', Validators.required]
    });
  }
//=============================================================================================
  private handleError(error: any): void {
    this.toastr.error('Error:', error);
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
    const formData = this.productForm.value;
    formData.image = this.imageUrl;

    const request$ = this.productId
      ? this.productsService.updateProduct(this.productId, formData)
      : this.productsService.createProduct(formData);

    request$.subscribe(
      (result: any) => {
        this.spinner.hide();
        if (result) {
          const actionMessage = this.productId ? 'Updated' : 'Created';
          this.toastr.success(`Product ${actionMessage} Successfully`);
          this.sharedService.sendUpdatedProductData(result);
          this.router.navigate(['admin/products']);
          this.onReset();
        }
      },
      (error) => {
        this.handleError(error);
      }
    );
  }
//=============================================================================================
  onReset(): void {
    this.submitted = false;
    this.imageUrl = "assets/images/image-uplaod.jpg";
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
  getProductById(productId: number) {
    this.productsService.getProductById(productId).subscribe(
      (product) => {
        if (product) {
          this.product = product;
          this.initProductForm(this.product);
          console.log(this.product);
        } else {
          this.sharedService.productNewData.subscribe(respons => {
            this.product = respons;
            this.initProductForm(this.product);
          });
        }
      },
      (error) => {
        this.handleError(error);
      }
    );
  }
//=============================================================================================
  getCategores() {
    this.categories = this.categoriesService.getCategories();
  }
}
