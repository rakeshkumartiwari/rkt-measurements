import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Employee } from 'src/app/model/model';
import { MeasurementService } from 'src/app/services/measurement.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnChanges {
  employeeList!: Employee[];
  showModal = false;
  employee!: Employee;

  constructor(private service: MeasurementService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.getEmployee();
    }
  }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee() {
    this.service.getEmployee().subscribe((data) => {
      if (data) {
        this.employeeList = data
      }
    });
  }

  onAddEmployee() {
    this.showModal = true;
  }

  onEdit(employee: Employee) {
    this.employee = employee;
    this.showModal = true;
  }

  onDelete(employeeId: string) {
    if (confirm('Do you want to delete this employee?')) {
      this.service.deleteEmployee(employeeId).subscribe((data) => {
        if (data) {
          this.getEmployee();
        }
      });
    }
  }
  popupClose() {
    this.showModal = false;
  }

  getPageRefresh(event: boolean) {
    if (event) {
      this.getEmployee();
      this.showModal = false;
    }
  }
}
