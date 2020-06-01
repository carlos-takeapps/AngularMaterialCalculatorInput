import { TestBed } from '@angular/core/testing';

import { NgxMatCalcInputService } from './ngx-mat-calc-input.service';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CalcOperator } from './ngx-mat-calc-input.enums';

describe('NgxMatCalcInputService', () => {
  let service: NgxMatCalcInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new NgxMatCalcInputService();
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  it('Test initial value to be 0', (done: DoneFn) => {
    let value = service.Value.subscribe(value => {
      expect(value).toBe(0);
      done();
    });
  })

  it('Test simple addition', (done: DoneFn) => {
    service.EnterDigit(2);
    service.EnterOperator(CalcOperator.Add);
    service.EnterDigit(2);
    service.EnterOperator(CalcOperator.Equals);

    let value = service.Value.subscribe(value => {
      expect(value).toBe(4); 
      done();
    });
  })

  it('Test multiple operations', (done: DoneFn) => {
    service.EnterDigit(2);
    service.EnterOperator(CalcOperator.Add);
    service.EnterDigit(2);
    service.EnterOperator(CalcOperator.Substract);
    service.EnterDigit(5);
    
    service.EnterOperator(CalcOperator.Equals);

    let value = service.Value.subscribe(value => {
      expect(value).toBe(-1); 
      done();
    });
  })

  it('Test use equal between two operations', (done: DoneFn) => {
    service.EnterDigit(2);
    service.EnterOperator(CalcOperator.Add);
    service.EnterDigit(2);
    service.EnterOperator(CalcOperator.Equals);
    service.EnterOperator(CalcOperator.Substract);
    service.EnterDigit(5);
    
    service.EnterOperator(CalcOperator.Equals);

    let value = service.Value.subscribe(value => {
      expect(value).toBe(-1); 
      done();
    });
  })

  it('Test use equal multiple times', (done: DoneFn) => {
    service.EnterDigit(4);
    service.EnterOperator(CalcOperator.Add);
    service.EnterDigit(1);
    service.EnterOperator(CalcOperator.Equals);    
    service.EnterOperator(CalcOperator.Equals);
    service.EnterOperator(CalcOperator.Equals);

    let value = service.Value.subscribe(value => {
      expect(value).toBe(7); 
      done();
    });
  })

  it('Test use clear', (done: DoneFn) => {
    service.EnterDigit(4);
    service.EnterOperator(CalcOperator.Add);
    service.ResetContext();
    
    let value = service.Value.subscribe(value => {
      expect(value).toBe(0); 
      done();
    });
  })

  it('Test use clear and try again', (done: DoneFn) => {
    service.EnterDigit(4);
    service.EnterOperator(CalcOperator.Add);
    service.EnterDigit(2);

    service.ResetContext();
    
    service.EnterDigit(1);
    service.EnterOperator(CalcOperator.Add);
    service.EnterDigit(8);
    service.EnterOperator(CalcOperator.Equals);

    let value = service.Value.subscribe(value => {
      expect(value).toBe(9); 
      done();
    });
  })

  it('Test division by zero', (done: DoneFn) => {
    service.EnterDigit(3);
    service.EnterOperator(CalcOperator.Divide);
    service.EnterDigit(1);
    service.EnterOperator(CalcOperator.Equals);

    let value = service.Value.subscribe(value => {
      expect(value).toBe(Infinity); 
      done();
    });
  })
  
});
