import { NgModule } from '@angular/core';
import { NgxMatCalcInputComponent } from './ngx-mat-calc-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    NgxMatCalcInputComponent,
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [NgxMatCalcInputComponent]
})
export class NgxMatCalcInputModule {
}
