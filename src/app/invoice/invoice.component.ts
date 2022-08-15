import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MeasurementService } from '../services/measurement.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  @ViewChild('container', { static: false }) el!: ElementRef;
  invoiceSubscription: Subscription[] = [];;
  invoiceDetails: any;

  constructor(private readonly measurementService: MeasurementService) { }

  ngOnInit(): void {
    this.invoiceSubscription.push(this.measurementService.getInvoiceSubject()
      .subscribe((data: any) => {
        this.invoiceDetails = data;
      }));
  }

  ngOnDestroy(): void {
    if (this.invoiceSubscription.length) {
      this.invoiceSubscription.forEach((item) => {
        item.unsubscribe();
      });
    }
  }

  onPrint() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('demo.pdf');
      }
    })
  }

}
