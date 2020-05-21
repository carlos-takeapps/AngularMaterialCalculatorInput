import { TestBed } from '@angular/core/testing';

import { NgxMatCalcInputService } from './ngx-mat-calc-input.service';

describe('NgxMatCalcInputService', () => {
  let service: NgxMatCalcInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMatCalcInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
