import { Employee } from "./employee";
import { EmployeeModel } from "./employee.model";
import { Injectable } from "@angular/core";

@Injectable()
export class EmployeeMappingUtil {  
  public static formateData(employee:Employee){
    if(employee==null){
      return new Employee();
    }    
    if(employee.day==null || employee.year==null){      
      let date = employee.dateOfBirth.split("-");
      employee.year = date[0];      
      employee.day = date[1];      
    }else{      
      employee.dateOfBirth = employee.year + '-' + employee.day;       
    }
    employee.dateOfEmployment = employee.dateOfEmployment!=null?new Date(employee.dateOfEmployment).toISOString().substr(0, 10):"Date not provided!";    
    return employee;
  }
}
