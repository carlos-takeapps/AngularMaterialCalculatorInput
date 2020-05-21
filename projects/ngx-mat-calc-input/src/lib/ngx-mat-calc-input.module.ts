import { NgModule } from '@angular/core';
import { NgxMatCalcInputComponent } from './ngx-mat-calc-input.component';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    NgxMatCalcInputComponent,
    
  ],
  imports: [
    MatFormFieldModule
  ],
  exports: [NgxMatCalcInputComponent]
})
export class NgxMatCalcInputModule { }
