import { Component, OnInit, Input } from '@angular/core';

import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

import { EmployeesListComponent } from '../employees-list/employees-list.component';
import { EmployeeMappingUtil } from '../employeeMappingUtil';

@Component({
  selector: 'employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  @Input() employee: any;

  constructor(private employeeService: EmployeeService, private listComponent: EmployeesListComponent) { 
    console.log("emp",this.employee);
  }
  ngOnInit() {
    console.log("ngOnInit");
    this.employee = EmployeeMappingUtil.getViewModelFromModel(this.employee);
  }

  updateStatus(isActive: boolean) {
    this.employeeService.updateEmployee(this.employee.id,
      { 
        firstName: this.employee.firstName,
        lastName: this.employee.lastName,
        middleInitial: this.employee.middleInitial,
        dateOfBirth: this.employee.dateOfBirth,
        dateOfEmployment: this.employee.dateOfEmployment,
        status: isActive
      }).subscribe(
      data => {
        console.log(data);
        this.employee = data as Employee;
      },
      error => console.log(error));
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.employee.id)
      .subscribe(
      data => {
        console.log(data);
        this.listComponent.reloadData();
      },
      error => console.log(error));
  }

}
