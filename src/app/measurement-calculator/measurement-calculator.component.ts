import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-measurement-calculator',
  templateUrl: './measurement-calculator.component.html',
  styleUrls: ['./measurement-calculator.component.scss']
})
export class MeasurementCalculatorComponent implements OnInit {

  height = '';
  width = '';
  quantity = '';
  perSqRate = '';
  totalSqFeet = 0;
  totalSqRate = 0;

  constructor(private readonly router: Router) { }

  ngOnInit() {
  }

  onCalculate(): void {
    this.totalSqFeet = (+this.height * +this.width * +this.quantity) / 12;
    this.totalSqRate = +this.perSqRate * this.totalSqFeet;
  }

  onReset(): void {
    this.height = '';
    this.width = '';
    this.quantity = '';
    this.perSqRate = '';
    this.totalSqFeet = 0;
    this.totalSqRate = 0;
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
