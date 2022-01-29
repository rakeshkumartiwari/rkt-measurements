import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MeasurementService } from '../services/measurement.service';
import { state } from '../model/model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  closeModal = '';
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl(''),
  });
  states: state[] = [];
  constructor(private readonly router: Router, private readonly measurementService: MeasurementService) { }

  ngOnInit(): void {
    this.states = this.measurementService.getStates();
  }

  goToMeasurementCalulator(): void {
    this.router.navigate(['/measurement-calculator']);
  }

  onCreate(): void {
    this.measurementService.setProfile(this.profileForm.value);
    this.router.navigate(['/measurement-calculator']);
  }
}
