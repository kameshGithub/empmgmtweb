import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { EmployeeMappingUtil } from '../employeeMappingUtil';

@Component({
  selector: 'create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  submitted = false;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  save() {
    //this.employee.status = "ACTIVE";
    this.employeeService.createEmployee(EmployeeMappingUtil.getModelFromViewModel(this.employee))
      .subscribe(data => console.log(data), error => console.log(error));
    this.employee = new Employee();
  }
  
  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
