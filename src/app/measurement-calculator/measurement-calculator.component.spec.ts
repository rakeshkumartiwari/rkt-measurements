import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementCalculatorComponent } from './measurement-calculator.component';

describe('MeasurementCalculatorComponent', () => {
  let component: MeasurementCalculatorComponent;
  let fixture: ComponentFixture<MeasurementCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasurementCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
