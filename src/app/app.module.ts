import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { EmployeeSearchComponent } from './employees/employee-search/employee-search.component';

import { EmployeeService } from './employees/employee.service';
import { EmployeesInjestComponent } from './employees/employees-injest/employees-injest.component';
import { AuthInterceptor } from './AuthIntercepter';


@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    EmployeeDetailsComponent,
    CreateEmployeeComponent,
    EmployeeSearchComponent,
    EmployeesInjestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },EmployeeService],
  bootstrap: [AppComponent]
})

export class AppModule { }
