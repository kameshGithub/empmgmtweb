import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

import { EmployeeMappingUtil } from '../employeeMappingUtil';

@Component({
  selector: 'employee-search',
  templateUrl: './employees-injest.component.html',
  styleUrls: ['./employees-injest.component.css']
})
export class EmployeesInjestComponent implements OnInit {

  fileToUpload: File;
  message: string;
  enableNavigation:boolean = false;
  constructor(private router: Router,private employeeService: EmployeeService) {

  }

  /**
   * TO set the passed in object on initialization in edit mode
   */
  ngOnInit() {
    
  }
  onSubmit(){
    if(this.fileToUpload==null){
      this.message="Please select employees file to Injest!!!";
      return;
    }    
    this.uploadFileToActivity();
    this.enableNavigation = true;
    //this.router.navigate(['/employees']);  
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  uploadFileToActivity() {
   this.employeeService.postFile(this.fileToUpload).subscribe(data => {
    this.message = data["message"];
    }, error => {
      console.log(error);
    });
  }
}
