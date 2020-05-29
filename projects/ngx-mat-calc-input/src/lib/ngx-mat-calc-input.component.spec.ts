import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatCalcInputComponent } from './ngx-mat-calc-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NgxMatCalcInputComponent', () => {
  let component: NgxMatCalcInputComponent;
  let fixture: ComponentFixture<NgxMatCalcInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        NgxMatCalcInputComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatCalcInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
