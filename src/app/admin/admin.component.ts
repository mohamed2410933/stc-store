
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ProductsService } from '../services/products.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent  {
  constructor() {}

}




