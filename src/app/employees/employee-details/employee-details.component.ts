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
  isEditMode:boolean = false;

  constructor(private employeeService: EmployeeService, private listComponent: EmployeesListComponent) { 

  }
  ngOnInit() {
    this.employee = EmployeeMappingUtil.getViewModelFromModel(this.employee);
  }
  editToggle(){   
      this.isEditMode = this.isEditMode?false:true;
      this.employee = EmployeeMappingUtil.getViewModelFromModel(this.employee);
  }
  update(employee) {
    if(employee!=null){
      this.employee = employee;
    }
    this.employeeService.updateEmployee(this.employee.id,
      EmployeeMappingUtil.getModelFromViewModel(this.employee)).subscribe(
      data => {
        console.log(data);
        this.employee = data as Employee;
      },
      error => console.log(error));
  }
  delete(){
    this.deleteByUpdateStatus();
  }
  private deleteByUpdateStatus() {  
    this.employeeService.deleteByDeactivateEmployee(this.employee.id)
    .subscribe(
      data => {
        console.log(data);
        //this.employee = data as Employee;
        this.employee = null;
      },
      error => console.log(error));
  }
  
  deleteActual() {
    this.employeeService.deleteEmployee(this.employee.id)
      .subscribe(
      data => {
        console.log(data);
        this.listComponent.reloadData();
      },
      error => console.log(error));
  }

}
