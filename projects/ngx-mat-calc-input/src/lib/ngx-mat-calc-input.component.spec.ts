import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatCalcInputComponent } from './ngx-mat-calc-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { Subject } from 'rxjs/internal/Subject';
import { FocusMonitor } from '@angular/cdk/a11y';

describe('NgxMatCalcInputComponent', () => {
  let component: NgxMatCalcInputComponent;
  let fixture: ComponentFixture<NgxMatCalcInputComponent>;
  let focusMonitorObservable: Subject<string>;

  beforeEach(async(() => {
    const fmSpy = jasmine.createSpyObj('FocusMonitor', ['monitor']);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        NgxMatCalcInputComponent,
        FaIconComponent
      ],
      providers: [
        { provide: FocusMonitor, useValue: fmSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    let focusMonitorSpy = TestBed.get(FocusMonitor);
    focusMonitorObservable = new Subject<string>();
    focusMonitorSpy.monitor.and.returnValue(focusMonitorObservable);
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
    fixture.detectChanges();

    expect(compiled.querySelector('.keyboard-button').hasAttribute('hidden')).toEqual(false);
  });

  it('should display keyboard', () => {
    const fixture = TestBed.createComponent(NgxMatCalcInputComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    focusMonitorObservable.next('mouse');

    compiled.querySelector('.keyboard-button').click();
    fixture.detectChanges();

    expect(compiled.querySelector('.calc-keyboard').hasAttribute('hidden')).toEqual(false);
  });

  it('should hide keyboard', () => {
    const fixture = TestBed.createComponent(NgxMatCalcInputComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    focusMonitorObservable.next('mouse');

    compiled.querySelector('.keyboard-button').click();
    compiled.querySelector('.keyboard-button').click();
    fixture.detectChanges();

    expect(compiled.querySelector('.calc-keyboard') === null).toBeTrue();
  });

  it('should update value', () => {
    const fixture = TestBed.createComponent(NgxMatCalcInputComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    focusMonitorObservable.next('mouse');

    compiled.querySelector('.keyboard-button').click();
    fixture.detectChanges();

    compiled.querySelector('#btn_2').click();
    fixture.detectChanges();

    const nodeAttributes = compiled.querySelector('.input-display').attributes as NamedNodeMap;
    expect(nodeAttributes.getNamedItem('ng-reflect-model').value).toEqual("2");
  });

  it('should resolve calculation', () => {
    const fixture = TestBed.createComponent(NgxMatCalcInputComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    focusMonitorObservable.next('mouse');

    compiled.querySelector('.keyboard-button').click();
    fixture.detectChanges();

    compiled.querySelector('#btn_2').click();
    compiled.querySelector('#btn_add').click();
    compiled.querySelector('#btn_5').click();
    compiled.querySelector('#btn_eq').click();
    fixture.detectChanges();

    const nodeAttributes = compiled.querySelector('.input-display').attributes as NamedNodeMap;
    expect(nodeAttributes.getNamedItem('ng-reflect-model').value).toEqual("7");
  });
});
