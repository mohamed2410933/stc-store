import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { AngularMaterialModule } from '../angular-material.module';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { DebounceFilterPipe } from './pipes/debounce-filter.pipe';
// import { AngularMaterialModule } from './angular-material.module';


@NgModule({
  declarations: [
   SharedComponent,
   NumbersOnlyDirective,
   DeleteModalComponent,
   DebounceFilterPipe
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
         
  ],
  exports:[NumbersOnlyDirective , DebounceFilterPipe]

})
export class SharedModule { }
