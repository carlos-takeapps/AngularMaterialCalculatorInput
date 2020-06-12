import { Component, HostBinding, Input, Optional, Self, ElementRef, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import { FormBuilder } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { NgControl } from "@angular/forms";
import { Subject } from 'rxjs';
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { NgxMatCalcInputService } from './ngx-mat-calc-input.service';
import { CalcOperator } from './ngx-mat-calc-input.enums';

@Component({
  selector: 'ngx-mat-calc-input',
  templateUrl: './ngx-mat-calc-input.component.html',
  styleUrls: ['./ngx-mat-calc-input.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: NgxMatCalcInputComponent }],
})
export class NgxMatCalcInputComponent implements MatFormFieldControl<number>, ControlValueAccessor {
  private _showKeyboard: boolean;

  public get showKeyboard(): boolean {
    return this.focused && this._showKeyboard;
  };

  public set showKeyboard(show: boolean) {
    this._showKeyboard = show;
  }

  public focused: boolean = false;
  public errorState: boolean = false;
  public controlType?: string = "ngx-mat-calc-input";
  public autofilled?: boolean;

  public calcIcon = faCalculator;


  constructor(
    @Optional() @Self() public ngControl: NgControl,
    fb: FormBuilder,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>,
    private calculatorService: NgxMatCalcInputService) {

    fm.monitor(elRef.nativeElement, true)
      .subscribe(origin => {
        this.focused = !!origin;
        this.stateChanges.next();
      });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.calculatorService.Value.subscribe(x => {
      this.value = x;
    });
  }

  /* ---------------------------------------------------------
   ControlValueAccessor Interface
  --------------------------------------------------------- */
  public onChange: any = () => { }
  public onTouch: any = () => { }

  @Output()
  valueChange = new EventEmitter();

  writeValue(value: number) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  /* ---------------------------------------------------------
   MatFormFieldControl<number> Interface
  --------------------------------------------------------- */

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
  @Input()
  public get value(): number {
    return this._value;
  }
  public set value(value: number) {
    let parsedValue = this.tryParseDigitEntry(value);

    if (!isNaN(parsedValue)) {
      this._value = value;
      this.stateChanges.next();

      this.onChange(value);
      this.valueChange.emit(value);
    }
  }

  public get empty() {
    return this.value != null;
  }

  onContainerClick(event: MouseEvent): void {
  }

  /* ---------------------------------------------------------
   Control behaviour 
  --------------------------------------------------------- */

  clickNumber($event): void {

    let input = Number($event.target.textContent);

    this.calculatorService.EnterDigit(this.tryParseDigitEntry(input));
  }

  clickOperator($event): void {

    this.calculatorService.EnterOperator(this.tryMapKeyToOperator($event.target.textContent));
  }

  clickClear(): void {
    this.calculatorService.ResetContext();
  }

  clickDecimal(): void {
    this.calculatorService.StartDecimalInput();
  }

  keyPressed($event): void {

    let input: string = $event.key.toString();

    if (input === ".") {
      this.calculatorService.StartDecimalInput();
    }
    else if (input === "Delete" ||
      input === "Backspace" ||
      input === "Escape") {
      this.clickClear();
    }
    else {
      let digit = this.tryParseDigitEntry(input);
      if (!isNaN(digit)) {
        this.calculatorService.EnterDigit(digit);
      }
      else {
        let operator = this.tryMapKeyToOperator(input);

        if (operator) {
          this.calculatorService.EnterOperator(operator);
        }
      }
    }
  }

  toggleKeyboard(): void {
    this.focused = true;
    this.showKeyboard = !this.showKeyboard;
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  private tryParseDigitEntry(input: any): number {
    return Number(input);
  }

  private tryMapKeyToOperator(input: string): CalcOperator {
    let result = null

    switch (input) {
      case "/":
      case "÷":
        result = CalcOperator.Divide;
        break;
      case "*":
      case "x":
        result = CalcOperator.Multiply;
        break;
      case "+":
        result = CalcOperator.Add;
        break;
      case "-":
        result = CalcOperator.Substract;
        break;
      case "^":
        result = CalcOperator.Power;
        break;
      case "Enter":
      case "=":
        result = CalcOperator.Equals;
        break;
    }

    return result;
  }
}
