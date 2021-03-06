import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Employee } from './employee';

@Injectable()
export class EmployeeService {

  private employee:Employee=null;
  private baseUrl = 'https://empmgmt.herokuapp.com/api/';
  private EMPLOYEES = 'employees';
  private EMPLOYEE = 'employee';  // used for create employee only

  constructor(private http: HttpClient) { }
  getCommonEmployee(){
    return this.employee;
  }
  setCommonEmployee(employee){
    this.employee =  employee;
  }
  getEmployee(id: string): Observable<Object> {
    return this.http.get(`${this.baseUrl + this.EMPLOYEES}/${id}`);
  }

  createEmployee(employee: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl + this.EMPLOYEE}`, employee);
  }

  updateEmployee(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl + this.EMPLOYEES}/${id}`, value);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl + this.EMPLOYEES}/${id}`, { responseType: 'text' });
  }

  deleteByDeactivateEmployee(id: string, userName: string, password: string): Observable<any> {
    let basicAuthValue = btoa(userName+':'+password); //username:pass   
    let headers = new HttpHeaders({'Authorization': 'Basic '+ basicAuthValue});
    return this.http.delete(`${this.baseUrl + this.EMPLOYEES}/${id}`,{ 
      headers:headers,
      responseType: 'text'       
    });
  }

  getEmployeesList(all: boolean): Observable<any> {
    if (all)
      return this.http.get(`${this.baseUrl + this.EMPLOYEES}` + '/all');
    else
      return this.http.get(`${this.baseUrl + this.EMPLOYEES}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl + '/actual/'+ this.EMPLOYEES}`, { responseType: 'text' });
  }

  postFile(fileToUpload: File) {    
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    let headersConfig = null;
    return this.http.post(`${this.baseUrl + this.EMPLOYEES}/injest`, formData, { headers: headersConfig });    
  }
  handleError(arg0: any): any {
    throw new Error("Method not implemented.");
  }
}
