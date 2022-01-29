import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MeasurementService } from '../services/measurement.service';

@Component({
  selector: 'app-measurement-calculator',
  templateUrl: './measurement-calculator.component.html',
  styleUrls: ['./measurement-calculator.component.scss']
})
export class MeasurementCalculatorComponent implements OnInit, OnDestroy {

  measurementsFrom: FormGroup = new FormGroup({
    mesurementList: new FormArray([])
  });
  itemArray: FormArray = this.measurementsFrom.controls['mesurementList'] as FormArray;
  // measurementsFrom!: FormGroup;
  sumTotalForm = new FormGroup({
    totalSqFeet: new FormControl('', Validators.required),
    perSqRate: new FormControl('', Validators.required),
    total: new FormControl('')
  });
  // itemArray!: FormArray;
  get dataList(): AbstractControl[] {
    const control = this.measurementsFrom.controls['mesurementList'] as FormArray;
    return control.controls;
  }
  totalSqFeet = 0;
  totalSqRate = 0;
  profileSubscription: Subscription[] = [];
  profileData: any;
  fulllName = '';

  constructor(private readonly router: Router, private readonly measurementService: MeasurementService) { }

  ngOnInit(): void {

    this.addMesurement();

    this.profileSubscription.push(this.measurementService.getProfile().subscribe((data) => {
      this.profileData = data;
    }));
  }

  ngOnDestroy(): void {
    if (this.profileSubscription.length) {
      this.profileSubscription.forEach((item) => {
        item.unsubscribe();
      });
    }
  }

  addMesurement(): void {
    if (!this.itemArray.valid) {
      return;
    } else {
      this.itemArray.push(new FormGroup({
        height: new FormControl('', Validators.required),
        width: new FormControl('', Validators.required),
        quantity: new FormControl('', Validators.required),
      }));
    }
  }

  onReset(): void {
    this.itemArray.clear();
    this.sumTotalForm.reset();
    this.addMesurement();
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  deleteMesurement(index: any): void {
    this.itemArray.removeAt(index);
    this.sumTotalForm.reset();
  }

  onCalculateTotalSqFeet(): void {
    this.totalSqFeet = 0;
    this.totalSqRate = 0;
    this.itemArray.value.forEach((item: any) => {
      this.totalSqFeet += (+item.height * +item.width * +item.quantity) / 144;
    });
    this.sumTotalForm.controls.totalSqFeet.patchValue(this.totalSqFeet);
    this.sumTotalForm.controls.perSqRate.patchValue('');
    this.sumTotalForm.controls.total.patchValue('');
  }

  onTotalCalculate(): void {
    if (!this.sumTotalForm.valid) {
      return;
    } else {
      const total = +this.sumTotalForm.controls.totalSqFeet.value * +this.sumTotalForm.controls.perSqRate.value;
      this.sumTotalForm.controls.total.patchValue(total);
    }
  }
}
