import { TestBed } from '@angular/core/testing';

import { NgxMatCalcInputService } from './ngx-mat-calc-input.service';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NgxMatCalcInputService', () => {
  let service: NgxMatCalcInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormBuilder,
        FormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
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


});
