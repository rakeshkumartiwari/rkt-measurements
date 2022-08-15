import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { clientDetail, Employee, state } from '../model/model';

const states: state[] = [
  { id: 1, name: 'Andhra Pradesh' },
  { id: 1, name: 'Arunachal Pradesh' },
  { id: 1, name: 'Assam' },
  { id: 1, name: 'Bihar' },
  { id: 1, name: 'Chhattisgarh' },
  { id: 1, name: 'Goa	Shri Bharat' },
  { id: 1, name: 'Gujarat' },
  { id: 1, name: 'Haryana' },
  { id: 1, name: 'Himachal' },
  { id: 1, name: 'Jammu & Kashmir' },
  { id: 1, name: 'Jharkhand' },
  { id: 1, name: 'Karnataka' },
  { id: 1, name: 'Kerala' },
  { id: 1, name: 'Madhya Pradesh' },
  { id: 1, name: 'Maharashtra	' },
  { id: 1, name: 'Manipur' },
  { id: 1, name: 'Meghalaya' },
  { id: 1, name: 'Mizoram' },
  { id: 1, name: 'Nagaland' },
  { id: 1, name: 'Odisha' },
  { id: 1, name: 'Punjab' },
  { id: 1, name: 'Rajasthan' },
  { id: 1, name: 'Sikkim' },
  { id: 1, name: 'Tamil Nadu' },
  { id: 1, name: 'Telangana' },
  { id: 1, name: 'Tripura	Shri' },
  { id: 1, name: 'Uttarakhand' },
  { id: 1, name: 'Uttar Pradesh' },
  { id: 1, name: 'West Bengal' }
]

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  profileSubject = new Subject<clientDetail>();
  invoiceSubject = new Subject<clientDetail>();
  employeeSubject = new Subject<any>();
  reloadSubject = new Subject<boolean>();
  url = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }
  
  setProfile(profile: clientDetail): void {
    setTimeout(() => {
      this.profileSubject.next(profile);
    });
  }

  getProfile(): Observable<clientDetail> {
    return this.profileSubject;
  }

  getStates(): state[] {
    return states;
  }

  setInvoiceSubject(invoiceDetails: any): void {
    setTimeout(() => {
      this.invoiceSubject.next(invoiceDetails);
    });
  }

  getInvoiceSubject(): Observable<clientDetail> {
    return this.invoiceSubject;
  }

  //Employe CRUD

  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  addEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.url, employee);
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(`${this.url}/${employee._id}`, employee);
  }

  deleteEmployee(employeeId: string): Observable<any> {
    return this.http.delete(`${this.url}/${employeeId}`);
  }

}
