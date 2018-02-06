import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  employees: Observable<Employee[]>;
  private fetchAll : boolean = true;
 
  constructor(private employeeService: EmployeeService, router:Router, route:ActivatedRoute) {
    router.events.forEach(e => {
        this.fetchAll = route.root.firstChild.snapshot.data['fetchAll'];
      });
  }

  ngOnInit() {
    this.reloadData();
  }
  
  deleteEmployees() {
    this.employeeService.deleteAll()
      .subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log('ERROR: ' + error));
  }

  reloadData() {
    this.employees = this.employeeService.getEmployeesList(this.fetchAll);
  }  
}
