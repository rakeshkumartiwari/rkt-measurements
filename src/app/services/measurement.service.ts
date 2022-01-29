import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  profileSubject = new Subject();
  constructor() { }

  setProfile(profile: any): void {
    setTimeout(() => {
      this.profileSubject.next(profile);
    });
  }

  getProfile(): Observable<any> {
    return this.profileSubject;
  }

}
