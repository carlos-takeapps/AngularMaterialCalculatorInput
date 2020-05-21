import { NgModule } from '@angular/core';
import { NgxMatCalcInputComponent } from './ngx-mat-calc-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NgxMatCalcInputComponent
  ],
  imports: [
      FormsModule, ReactiveFormsModule
  ],
  exports: [NgxMatCalcInputComponent]
})
export class NgxMatCalcInputModule { }
