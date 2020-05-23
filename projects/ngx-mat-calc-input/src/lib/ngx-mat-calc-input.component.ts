import { Component, HostBinding, Input, Optional, Self, ElementRef } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import { FormBuilder } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { NgControl } from "@angular/forms";
import { Subject } from 'rxjs';


@Component({
  selector: 'ngx-mat-calc-input',
  templateUrl: './ngx-mat-calc-input.component.html',
  styleUrls: ['./ngx-mat-calc-input.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: NgxMatCalcInputComponent }],
})
export class NgxMatCalcInputComponent implements MatFormFieldControl<number> {
  private _value: number;
  private static nextId = 0;
  private _placeholder: string;

  focused: boolean = false;
  errorState: boolean = false;
  controlType?: string = "ngx-mat-calc-input";
  autofilled?: boolean;

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
    this.stateChanges.next();
  }

  @HostBinding()
  id = `ngx-mat-calc-input-${NgxMatCalcInputComponent.nextId++}`;

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;

  get empty() {
    return this.value != null;
  }
  stateChanges = new Subject<void>();

  @HostBinding('attr.aria-describedby') describedBy = '';
  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  private _disabled = false;

  showKeyboard: boolean = true;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    fb: FormBuilder, private fm: FocusMonitor, private elRef: ElementRef<HTMLElement>) {
    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
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

}
