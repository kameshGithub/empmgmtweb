import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { EmployeeMappingUtil } from '../employeeMappingUtil';

@Component({
  selector: 'create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  @Input() employee: Employee = new Employee();;
  submitted = false;
  @Input() mode = 1; // 1=credit, 2=edit, 3=canceled
  @Output() empCreated = new EventEmitter<Employee>();
  @Output() toUpdate = new EventEmitter<Employee>();
  @Output() action = new EventEmitter<Number>();

  constructor(private _location: Location, private employeeService: EmployeeService) { 
         
  }

  ngOnInit() { }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }
  save() {
    this.employeeService.createEmployee(EmployeeMappingUtil.getModelFromViewModel(this.employee))
      .subscribe(data => console.log(data), error => console.log(error));
    this.employee = new Employee();
  }  
  onSubmit() {
    this.submitted = true;
    if(this.mode==1){
      this.save();      
      this.empCreated.emit(this.employee);
    }else{
      this.mode=2;      
      this.toUpdate.emit(this.employee);
    } 
  }
  cancel(){
    
    this.mode=3;
    this.action.emit(this.mode);
    this._location.back();
  }
}
