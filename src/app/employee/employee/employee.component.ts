import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Employee } from 'src/app/model/model';
import { MeasurementService } from 'src/app/services/measurement.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnChanges {
  employeeList!: Employee[];
  showModal = false;
  employee!: Employee;
  isFormReset = false;

  constructor(private service: MeasurementService, private toastr: ToastrService) { }

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
    this.isFormReset = false;
    this.employee = employee;
    this.showModal = true;
  }

  onDelete(employeeId: string) {
    if (confirm('Do you want to delete this employee?')) {
      this.service.deleteEmployee(employeeId).subscribe((data) => {
        if (data) {
          this.getEmployee();
          this.toastr.success('Deleted successfuly.', 'Delete');
        }
      });
    }
  }
  popupClose() {
    this.isFormReset = true;
    this.showModal = false;
  }

  getPageRefresh(event: any) {
    if (event && event.isRefresh && event.mode === "add") {
      this.getEmployee();
      this.showModal = false;
      this.toastr.success('Added successfuly.', 'Add');
    } else if (event && event.isRefresh && event.mode === "edit") {
      this.getEmployee();
      this.showModal = false;
      this.toastr.success('Updated successfuly.', 'Edit');
    } else {
      this.showModal = false;
    }
    this.isFormReset = true;
  }
}
