import { Component, OnInit, Input, Output } from '@angular/core';
import { Router }                 from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

import { EmployeeMappingUtil } from '../employeeMappingUtil';

@Component({
  selector: 'employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit {

  private message: string;
  private employeeId: any = null;
  @Output() employee: Employee;
  constructor(private router: Router,private employeeService: EmployeeService) {

  }

  /**
   * TO set the passed in object on initialization in edit mode
   */
  ngOnInit() {
    
  }
  onSubmit(){
    if(this.employeeId==null){
      this.message="Please enter employee id!!!";
      return;
    }    
    this.router.navigate(['/employees',this.employeeId]);   
  }  
}
