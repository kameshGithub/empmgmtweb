import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'allemployees', component: EmployeesListComponent, data: {fetchAll:true} },
  { path: 'employees', component: EmployeesListComponent },
  { path: 'add', component: CreateEmployeeComponent },
  { path: 'allemployees/edit', component: CreateEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
