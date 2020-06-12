import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularMaterialCalculatorInput';

  calcValue: number = 0;

  addCalcValue(): void {
    ++this.calcValue;
  }
}
