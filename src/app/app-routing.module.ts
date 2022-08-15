import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { MeasurementCalculatorComponent } from './measurement-calculator/measurement-calculator.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'measurement-calculator', component: MeasurementCalculatorComponent },
  { path: 'measurement-invoice', component: InvoiceComponent },
  {path:'employee', component: EmployeeComponent},
  {path:'add-employee', component: AddEmployeeComponent},
  {path:'edit-employee', component: AddEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
