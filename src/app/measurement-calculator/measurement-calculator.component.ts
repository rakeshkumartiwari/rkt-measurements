import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { clientDetail } from '../model/model';
import { MeasurementService } from '../services/measurement.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-measurement-calculator',
  templateUrl: './measurement-calculator.component.html',
  styleUrls: ['./measurement-calculator.component.scss']
})
export class MeasurementCalculatorComponent implements OnInit, OnDestroy {

  @ViewChild('container', { static: false }) el!: ElementRef;
  @ViewChild('content', { static: false }) el1!: ElementRef;
  measurementsFrom: FormGroup = new FormGroup({
    mesurementList: new FormArray([])
  });
  itemArray: FormArray = this.measurementsFrom.controls['mesurementList'] as FormArray;
  sumTotalForm = new FormGroup({
    totalSqFeet: new FormControl('', Validators.required),
    perSqRate: new FormControl('', Validators.required),
    total: new FormControl('')
  });
  get dataList(): AbstractControl[] {
    const control = this.measurementsFrom.controls['mesurementList'] as FormArray;
    return control.controls;
  }
  totalSqFeet = 0;
  totalSqRate = 0;
  profileSubscription: Subscription[] = [];
  clientDetails!: clientDetail;
  fulllName = '';
  address = '';

  constructor(private readonly router: Router, private readonly measurementService: MeasurementService) { }

  ngOnInit(): void {
    this.addMesurement();
    this.profileSubscription.push(this.measurementService.getProfile()
      .subscribe((data: clientDetail) => {
        this.clientDetails = data;
        this.address = this.createAddress(this.clientDetails);
      }));
  }

  ngOnDestroy(): void {
    if (this.profileSubscription.length) {
      this.profileSubscription.forEach((item) => {
        item.unsubscribe();
      });
    }
  }

  onQuantityChange(data : any, index: any){
  
  }

  addMesurement(): void {
    if (!this.itemArray.valid) {
      return;
    } else {
      this.itemArray.push(new FormGroup({
        height: new FormControl('', Validators.required),
        width: new FormControl('', Validators.required),
        quantity: new FormControl('', Validators.required),
        totalSqFeet: new FormControl(''),
        perSqRate: new FormControl(''),
        total: new FormControl(''),
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

  createAddress(clientDetails: clientDetail): string {
    let address = clientDetails.address !== '' ? clientDetails.address + ', ' : '';
    let city = clientDetails.city !== '' ? clientDetails.city + ', ' : '';
    let state = (clientDetails.state.name !== undefined && clientDetails.state.name !== '') ? clientDetails.state.name + ', ' : '';
    let zip = clientDetails.zip !== '' ? clientDetails.zip : '';
    return address + city + state + zip;
  }

  onPrint() {
    const invoiceDetails = {
      clientDetails: this.clientDetails,
      itemArray: this.itemArray.value,
      sumTotal: this.sumTotalForm.value
    }

    this.measurementService.setInvoiceSubject(invoiceDetails);
    this.router.navigate(['/measurement-invoice']);
    // let ele = this.el.nativeElement;
    // html2canvas(ele).then((canvas) => {
    //   let imageData = canvas.toDataURL('image/png')
    //   let imageHeight = canvas.height * 208 / canvas.width;
    // let pdf = new jsPDF();
    //   pdf.addImage(imageData, 0, 0 , 208, imageHeight)
    //   pdf.save('test.pdf');
    // });

    // pdf.html(this.el1.nativeElement, {
    //   callback: (pdf) => {
    //     pdf.save('test.pdf');
    //   }
    // })


  }
}
