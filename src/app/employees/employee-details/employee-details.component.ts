import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

import { EmployeeMappingUtil } from '../employeeMappingUtil';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  editOrCancel: string="Edit";
  deleteOrCancel: string ="Delete";
  modal:string;
  userName: any;
  password: any;
  captureAuth: boolean = false;
  message: string;
  employeeId: any = "employeeId" ;
  @Input() employee: Employee = null;
  @Output() onDelete = new EventEmitter<boolean>();
  @Output() onAboutDelete = new EventEmitter<string>();
  @Output() onAboutEdit = new EventEmitter<Employee>();
  isEditMode:boolean = false;
  isSearch:boolean = false;
  
  constructor(private employeeService: EmployeeService, private router:Router, route:ActivatedRoute) {   
    this.captureAuth = false; 
    this.employeeId = route.snapshot.paramMap.get('id');      
      if(this.employeeId!=null){
        this.isSearch = true;
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
    this.modal ="#authModel";
    this.onShowModal();
  }
  /**
   * To change the mode from edit-create-cancel
   */
  toggleEditOrCancel(){      
      //this.isEditMode = this.isEditMode?false:true;
      if(this.editOrCancel=="Cancel"){
        this.router.navigate(['employees']);
      }else{
        this.router.navigate(['employees/edit',this.employee.employeeId]);
      }
      this.editOrCancel = this.editOrCancel=="Edit"?"Cancel":"Edit";
      this.onAboutEdit.emit(this.employee);
  }
  // /**
  //  * 
  //  * @param employee 
  //  */
  // update(employee) {    
  //   this.editOrCancel();
  //   this.employeeService.updateEmployee(this.employee.id, EmployeeMappingUtil.formateData(this.employee)).subscribe(
  //     data => {
  //       this.toggleModal(this.modal);
  //       console.log(data);
  //       this.employee = EmployeeMappingUtil.formateData(data as Employee);       
  //     },
  //     error => console.log(error));
  // }
  /** Delete employee by changing the status from ACTIVE to INACTIVE */
  delete(){
    this.message=null;
    if(this.userName && this.password){
      this.deleteByUpdateStatus();       
    }else{
      this.message="Please provide user/pass!";
    }
  }
  private deleteByUpdateStatus() {
    this.employeeService.deleteByDeactivateEmployee(this.employee.id, this.userName, this.password)
    .subscribe(
      data => {
        this.message="Employee deleted successfully!!!";        
        this.captureAuth = false;
        this.employee = null;        
        this.onDelete.emit(true);
      }, error => { 
        console.log(error);
        this.message="You are not authorized to delete employee!!!";
      });      
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
        this.employeeId = this.employee.employeeId;
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
  toggleModal(modalId, employeeId){ 
    this.captureAuth = this.captureAuth?false:true;
    this.deleteOrCancel = this.deleteOrCancel=="Delete"?"Cancel":"Delete";
    this.modal = modalId;
    this.message=null;
    this.employeeId = employeeId;   
    $(this.modal).find('.emp input').val(this.employeeId);
    $(this.modal).modal('toggle');
    //this.onAboutDelete.emit(true);
  }
  onShowModal(){
    $(this.modal).on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) // Button that triggered the modal
      var recipient = button.data('whatever') // Extract info from data-* attributes
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      var modal = $(this)
      //modal.find('.editMode create-employee').value(recipient);
      //modal.find('.modal-title').text('New message to ' + recipient)
      modal.find('.todelete input').val(recipient)
    })
    
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
