import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalcOperator } from './ngx-mat-calc-input.enums';

@Injectable({
  providedIn: 'root'
})
export class NgxMatCalcInputService {
  private _isNewNumber: boolean = true;
  private _decimalPlace: number = 0;
  private _previousValue: number = 0;
  private _currentResult: number = 0;
  private _storedContextOperator: CalcOperator = null;
  private _previousOperator: CalcOperator = null;
  private _value = new BehaviorSubject<number>(0);
  private set value(number: number) {
    this._value.next(number);
  }
  private get value(): number {
    return this._value.getValue();
  }

  public Value = this._value.asObservable();

  constructor() { }

  public EnterDigit(digit: number): void {

    if (isNaN(digit)) return;

    if (this._decimalPlace > 0) {
      let decimalDivisor = (10 ** this._decimalPlace);
      let decimalAdd = Number((Number(digit) / decimalDivisor));

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
        this.value = Number(digit);
        this._decimalPlace = 0;
      }
      else {
        this.value = Number(this.value * 10) + Number(digit);
      }
    }
    this._isNewNumber = false;
  }

  public EnterOperator(operator: CalcOperator): void {

    this._isNewNumber = true;
    this._decimalPlace = 0;

    let contextValue: number = null;
    let contextOperator: CalcOperator = null;

    if (operator === CalcOperator.Equals &&
      this._previousOperator === CalcOperator.Equals) {
      contextValue = this._previousValue;
      contextOperator = this._storedContextOperator;
    }
    else {
      contextValue = this.value;
      contextOperator = this._previousOperator;
    }

    switch (contextOperator) {
      case CalcOperator.Add:
        this.value = Number(this._currentResult) + Number(contextValue);
        break;
      case CalcOperator.Substract:
        this.value = Number(this._currentResult) - Number(contextValue);
        break;
      case CalcOperator.Multiply:
        this.value = Number(this._currentResult) * Number(contextValue);
        break;
      case CalcOperator.Divide:
        this.value = Number(this._currentResult) / Number(contextValue);
        break;
      case CalcOperator.Power:
        this.value = Number(this._currentResult) ** Number(contextValue);
        break;
    }

    this._currentResult = this.value;
    this._previousValue = contextValue;

    this._previousOperator = operator;

    if (operator !== CalcOperator.Equals) {
      this._storedContextOperator = operator;
    }
  }

  public ResetContext(): void {
    this.value = 0;
    this._previousValue = 0;
    this._currentResult = 0;
    this._storedContextOperator = null;
    this._previousOperator = null;
    this._isNewNumber = true;
    this._decimalPlace = 0;
  }

  public StartDecimalInput(): void {
    if (this._decimalPlace === 0) {
      this._decimalPlace = 1;
    }
  }
}

