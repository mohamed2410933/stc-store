import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';


@NgModule({
  declarations: [
   SharedComponent,
   NumbersOnlyDirective,
   DeleteModalComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    NgxStarRatingModule,
    FormsModule,

  ],
  exports:[NumbersOnlyDirective , NgxStarRatingModule , FormsModule,

  ]

})
export class SharedModule { }
