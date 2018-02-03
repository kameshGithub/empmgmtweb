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
  
  /**
   * TO set the passed in object on initialization in edit mode
   */
  ngOnInit() {
    this.employee = EmployeeMappingUtil.formateData(this.employee);
  }
  /**
   * To change the mode from edit-create-cancel
   */
  editOrCancel(){
      this.isEditMode = this.isEditMode?false:true;
  }
  /**
   * 
   * @param employee 
   */
  update(employee) {
    this.editOrCancel();
    this.employeeService.updateEmployee(this.employee.id,this.employee).subscribe(
      data => {
        console.log(data);
        this.employee = EmployeeMappingUtil.formateData(data as Employee);
      },
      error => console.log(error));
  }
  /** Delete employee by changing the status from ACTIVE to INACTIVE */
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
