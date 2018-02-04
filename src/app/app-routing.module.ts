import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { EmployeeSearchComponent } from './employees/employee-search/employee-search.component';

const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'allemployees', component: EmployeesListComponent, data: {fetchAll:true} },
  { path: 'employees', component: EmployeesListComponent },
  { path: 'add', component: CreateEmployeeComponent },
  { path: 'allemployees/edit', component: CreateEmployeeComponent},
  { path: 'employees/:id', component: EmployeeDetailsComponent },  
  { path: 'search', component: EmployeeSearchComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
