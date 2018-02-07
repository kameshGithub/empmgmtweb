import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { EmployeeMappingUtil } from '../employeeMappingUtil';
import { Router, ActivatedRoute } from '@angular/router';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  title:string;
  message: string;
  employeeId: string;
  @Input() employee: Employee = new Employee();;
  submitted = false;
  @Input() mode = 1; // 1=credit, 2=edit, 3=canceled
  @Output() empCreated = new EventEmitter<Employee>();
  @Output() toUpdate = new EventEmitter<Employee>();
  @Output() action = new EventEmitter<Number>();

  constructor(private _location: Location, private employeeService: EmployeeService, private router:Router, route:ActivatedRoute) { 
      this.title = "Add Employee";  
      this.employeeId = route.snapshot.paramMap.get('id');
      if(this.employeeId!=null){ 
        this.title = "Edit Employee";
        this.mode = 2;       
        this.searchEmployee();
      }
  }
  
  ngOnInit() { }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }
  save() { 
    this.employeeService.createEmployee( EmployeeMappingUtil.formateData(this.employee))
      .subscribe(data =>{
         console.log(data) 
    }, error => console.log(error));
    this.employee = new Employee();    
  }
  onSubmit() {
    this.submitted = true;
    if(this.mode==1){
      this.save();
      this.message = "Employee Created Successfully";
      //this.router.navigate(['employees']);
      this.empCreated.emit(this.employee);
    }else{
      this.mode=2;
      this.update();   
      this.message = "Employee Updated Successfully";
      //this.router.navigate(['employees']); 
      this.toUpdate.emit(this.employee);
    } 
  }
  /**
   * 
   * @param employee 
   */
  update() {    
    this.employeeService.updateEmployee(this.employee.id, EmployeeMappingUtil.formateData(this.employee)).subscribe(
      data => {        
        this.employee = EmployeeMappingUtil.formateData(data as Employee);        
      },
      error => console.log(error));
  }
  cancel(){    
    this.mode=3;
    this.action.emit(this.mode);
    this._location.back();
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
          this.message = "Employee not found or InActive!";
        }else{
          this.message = "Error, Getting employee!";
        }
      });
  }
}
