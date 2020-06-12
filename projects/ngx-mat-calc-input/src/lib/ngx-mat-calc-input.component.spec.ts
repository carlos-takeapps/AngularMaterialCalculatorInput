import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

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

  /* it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Calc button', () => {
    const fixture = TestBed.createComponent(NgxMatCalcInputComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    fixture.detectChanges();

    expect(compiled.querySelector('.keyboard-button').hasAttribute('hidden')).toEqual(false);
  });

  it('should display keyboard', () => {
    const fixture = TestBed.createComponent(NgxMatCalcInputComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    compiled.querySelector('.keyboard-button').click();
    fixture.detectChanges();

    expect(compiled.querySelector('.calc-keyboard').hasAttribute('hidden')).toEqual(false);
  });

  it('should hide keyboard', () => {
    const fixture = TestBed.createComponent(NgxMatCalcInputComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    compiled.querySelector('.keyboard-button').click();
    compiled.querySelector('.keyboard-button').click();
    fixture.detectChanges();

    expect(compiled.querySelector('.calc-keyboard')===null).toBeTrue();
  }); */

  it('should update value', <any>fakeAsync(() => {
    const fixture = TestBed.createComponent(NgxMatCalcInputComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    compiled.querySelector('.keyboard-button').click();
    fixture.detectChanges();

    compiled.querySelector('#btn_2').click();
    fixture.detectChanges();

    tick(3000);
    
    expect(compiled.querySelector('.input-display').innerHTML).toBe("2");
  }));
/* 
  it('should resolve calculation', <any>fakeAsync(() => {
    const fixture = TestBed.createComponent(NgxMatCalcInputComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    compiled.querySelector('.keyboard-button').click();
    fixture.detectChanges();

    compiled.querySelector('#btn_2').click();
    compiled.querySelector('#btn_add').click();
    compiled.querySelector('#btn_5').click();
    compiled.querySelector('#btn_eq').click();
    tick();
    fixture.detectChanges();

    expect(compiled.querySelector('.input-display').value).toBe("7");
  })); */
});
