import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatCalcInputComponent } from './ngx-mat-calc-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

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

  it('should display Calc button', () => {
    const fixture = TestBed.createComponent(NgxMatCalcInputComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.keyboard-button').hasAttribute('hidden')).toEqual(false);
  });

  it('should display keyboard', () => {
    const fixture = TestBed.createComponent(NgxMatCalcInputComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    let divButton = fixture.debugElement.query(By.css('keyboard-button'));

    divButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(compiled.querySelector('.calc-keyboard').hasAttribute('hidden')).toEqual(false);
  });

  // it('should hide keyboard', () => {
  //   const fixture = TestBed.createComponent(NgxMatCalcInputComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   compiled.querySelector('.keyboard-button').nativeElement.click();
  //   expect(compiled.querySelector('.calc-keyboard').hasAttribute('hidden')).toEqual(false);
  // });

  // it('should update value', () => {
  //   const fixture = TestBed.createComponent(NgxMatCalcInputComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   compiled.querySelector('.keyboard-button').nativeElement.click();
  //   expect(compiled.querySelector('.calc-keyboard').hasAttribute('hidden')).toEqual(false);
  // });

});
