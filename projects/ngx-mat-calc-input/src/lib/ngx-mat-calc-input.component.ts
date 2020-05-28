import { Component, HostBinding, Input, Optional, Self, ElementRef } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import { FormBuilder } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { NgControl } from "@angular/forms";
import { Subject } from 'rxjs';
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { isNumber } from 'util';

@Component({
  selector: 'ngx-mat-calc-input',
  templateUrl: './ngx-mat-calc-input.component.html',
  styleUrls: ['./ngx-mat-calc-input.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: NgxMatCalcInputComponent }],
})
export class NgxMatCalcInputComponent implements MatFormFieldControl<number> {
  private _previousValue: number = 0;
  private _currentResult: number = 0;
  private _storedContextOperator: string = null;
  private _previousOperator: string = null;
  private _isNewNumber: boolean = true;
  private _decimalPlace: number = 0;

  public showKeyboard: boolean = false;

  public focused: boolean = false;
  public errorState: boolean = false;
  public controlType?: string = "ngx-mat-calc-input";
  public autofilled?: boolean;

  public calcIcon = faCalculator;

  public get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  private static _nextId = 0;
  @HostBinding()
  public id = `ngx-mat-calc-input-${NgxMatCalcInputComponent._nextId++}`;

  @HostBinding('attr.aria-describedby')
  public describedBy = '';
  public setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  private _placeholder: string;
  @Input()
  public get placeholder() {
    return this._placeholder;
  }
  public set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  private _required = false;
  @Input()
  public get required() {
    return this._required;
  }
  public set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  private _disabled = false;
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  public stateChanges = new Subject<void>();

  private _value: number = 0;
  public get value(): number {
    return this._value;
  }
  public set value(value: number) {
    if (this.isValidEntry(value)) {
      this._value = value;
      this.stateChanges.next();
    }
  }

  public get empty() {
    return this.value != null;
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    fb: FormBuilder, private fm: FocusMonitor, private elRef: ElementRef<HTMLElement>) {
    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });

    this.value = 0;
  }

  clickNumber($event): void {

    let input = Number($event.target.textContent);

    if (this.isValidEntry(input)) {
      this.enterNumber(input);
    }
  }

  clickOperator($event): void {

    this.enterOperator($event.target.textContent);
  }








  
  enterNumber(number: number) {
    if (this._decimalPlace > 0) {
      let decimalDivisor = (10 ** this._decimalPlace);
      let decimalAdd = Number((Number(number) / decimalDivisor));

      if (this._isNewNumber) {
        this.value = decimalAdd;
      }
      else {
        this.value = Number(this.value) + decimalAdd;
      }
      ++this._decimalPlace;
    }
    else {
      if (this._isNewNumber) {
        this.value = Number(number);
        this._decimalPlace = 0;
      }
      else {
        this.value = Number(this.value * 10) + Number(number);
      }
    }
    this._isNewNumber = false;

  }

  enterOperator(operator: string) {

    this._isNewNumber = true;
    this._decimalPlace = 0;

    let contextValue = null;
    let contextOperator = null;

    if (operator === "=" && this._previousOperator === "=") {
      contextValue = this._previousValue;
      contextOperator = this._storedContextOperator;
    }
    else {
      contextValue = this.value;
      contextOperator = this._previousOperator;
    }

    switch (contextOperator) {
      case "+":
        this.value = Number(this._currentResult) + Number(contextValue);
        break;
      case "-":
        this.value = Number(this._currentResult) - Number(contextValue);
        break;
      case "x":
      case "*":
        this.value = Number(this._currentResult) * Number(contextValue);
        break;
      case "/":
      case "÷":
        this.value = Number(this._currentResult) / Number(contextValue);
        break;
      case "^":
        this.value = Number(this._currentResult) ** Number(contextValue);
        break;
    }

    this._currentResult = this.value;
    this._previousValue = contextValue;

    this._previousOperator = operator;

    if (operator !== "=") {
      this._storedContextOperator = operator;
    }
  }

  clickClear(): void {
    this.value = 0;
    this._previousValue = 0;
    this._currentResult = 0;
    this._storedContextOperator = null;
    this._previousOperator = null;
    this._isNewNumber = true;
    this._decimalPlace = 0;
  }

  clickDecimal(): void {
    if (this._decimalPlace === 0) {
      this._decimalPlace = 1;
    }
  }

  keyPressed($event): void {

    let key: string = $event.key.toString();
    let input = Number(key);

    if (this.isValidEntry(input)) {
      this.enterNumber(input);
    }
    else {
      if (key === "/" ||
        key === "*" ||
        key === "-" ||
        key === "+" ||
        key === "=") {
        this.enterOperator(key);
      }
      else if (key === "Enter") {
        this.enterOperator("=");
      }
      else if (key === ".") {
        this.clickDecimal();
      }
      else if (key === "Delete" ||
        key === "Backspace" ||
        key === "Escape") {
        this.clickClear();
      }
    }
  }

  toggleKeyboard(): void {
    this.showKeyboard = !this.showKeyboard;
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  onContainerClick(event: MouseEvent): void {
  }

  private isValidEntry(number: Number): boolean {
    return isNumber(number) &&
      !isNaN(number);
  }
}
