import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

import { EmployeeMappingUtil } from '../employeeMappingUtil';

@Component({
  selector: 'employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  message: string;
  private employeeId: string;
  @Input() employee: Employee = null;
  @Output() onDelete = new EventEmitter<boolean>();
  isEditMode:boolean = false;
  isSearch:boolean = false;
 
  constructor(private employeeService: EmployeeService,  router:Router, route:ActivatedRoute) {   
      this.employeeId = route.snapshot.paramMap.get('id');
      if(this.employeeId!=null){
        this.searchEmployee();
      }
  }
  
  /**
   * TO set the passed in object on initialization in edit mode
   */
  ngOnInit() {
    if(this.employee!=null){
      this.employee = EmployeeMappingUtil.formateData(this.employee);
    }
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
        //console.log(data);
        //this.employee = data as Employee;
        this.employee = null;
        this.onDelete.emit(true);
      });
      //, error => console.log(error));
  }
  /**
   * 
   * @param employee 
   */
  searchEmployee() {
    this.employeeService.getEmployee(this.employeeId).subscribe(
      data => {
        console.log(data);
        this.employee = EmployeeMappingUtil.formateData(data as Employee);
      },
      error => { 
        console.log(error)
        if(error.status==404){
          this.message = "Employee not found(InActive)!";
        }else{
          this.message = "Error, Getting employee!";
        }
      });
  }
  // deleteActual() {
  //   this.employeeService.deleteEmployee(this.employee.id)
  //     .subscribe(
  //     data => {
  //       console.log(data);
  //       this.listComponent.reloadData();
  //     },
  //     error => console.log(error));
  // }

}
