import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatCalcInputComponent } from './ngx-mat-calc-input.component';

describe('NgxMatCalcInputComponent', () => {
  let component: NgxMatCalcInputComponent;
  let fixture: ComponentFixture<NgxMatCalcInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMatCalcInputComponent ]
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
