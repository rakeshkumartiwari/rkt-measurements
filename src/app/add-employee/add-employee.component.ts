import { Component, OnDestroy, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MeasurementService } from '../services/measurement.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit, OnDestroy, OnChanges {
  employeeForm!: FormGroup;
  isEdit = false;
  editData: any;
  showModal = false;
  subscription!: Subscription;
  deptList = [
    { id: 1, value: 'Development' },
    { id: 1, value: 'Administration' },
    { id: 1, value: 'Cloud' },
    { id: 1, value: 'Design' },
  ]
  @Output() pageRefresh = new EventEmitter<any>()
  @Input() employee = {};
  @Input() isFormReset = false;


  constructor(private service: MeasurementService) { }

  ngOnChanges(): void {
    if (this.employee && !this.isFormReset) {
      this.employeeForm.patchValue(this.employee);
      this.isEdit = true;
    } else {
      this.isEdit = false;
      this.employeeForm.reset();
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  initForm() {
    this.employeeForm = new FormGroup({
      _id: new FormControl(),
      name: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      dept: new FormControl('', Validators.required)
    });
  }

  onDeptChange(event: any) {
    this.employeeForm.get('dept')?.patchValue(event.target.value);
  }

  onSubmit() {
    if (!this.isEdit) {
      this.service.addEmployee(this.employeeForm.value).subscribe((data) => {
        if (data) {
          this.pageRefresh.emit({ isRefresh: true, mode: 'add' });
        }
      });
    } else {
      this.service.updateEmployee(this.employeeForm.value).subscribe((data) => {
        if (data) {
          this.pageRefresh.emit({ isRefresh: true, mode: 'edit' });
        }
      });
    }
  }

  onClose() {
    this.pageRefresh.emit({ isRefresh: false, mode: 'close' });
    this.employeeForm.reset();
  }

}
