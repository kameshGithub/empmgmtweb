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
  private message: string;
 
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
    //this.router.navigate(['/employees',this.employeeId]);  
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  uploadFileToActivity() {
   this.employeeService.postFile(this.fileToUpload).subscribe(data => {
    // do something, if upload success
      console.log("data:",data);
    }, error => {
      console.log(error);
    });
  }
}
