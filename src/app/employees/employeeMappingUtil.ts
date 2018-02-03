import { Employee } from "./employee";
import { EmployeeModel } from "./employee.model";
import { Injectable } from "@angular/core";

@Injectable()
export class EmployeeMappingUtil {
  /**
   * 
   * @param vmEmployee Employee
   */
  public static getModelFromViewModel(vmEmployee:Employee){
    let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    let mEmployee = new EmployeeModel();
    if(vmEmployee==null){
      return mEmployee;
    }
    mEmployee.id = vmEmployee.id;
    mEmployee.firstName = vmEmployee.firstName;
    mEmployee.middleInitial = vmEmployee.middleInitial;
    mEmployee.lastName = vmEmployee.lastName;
    mEmployee.dob = vmEmployee.dateOfBirth!=null?new Date(vmEmployee.dateOfBirth.replace(pattern,'$3-$2-$1')):null;
    mEmployee.doj = vmEmployee.dateOfEmployment!=null?new Date(vmEmployee.dateOfEmployment.replace(pattern,'$3-$2-$1')):null;
    mEmployee.status = vmEmployee.status?"ACTIVE":"INACTIVE";
    return mEmployee;
  }
  /**
   * 
   * @param mEmployee EmployeeModel
   */
  public static getViewModelFromModel(mEmployee:EmployeeModel){
    let vmEmployee = new Employee();
    if(mEmployee==null){
      return vmEmployee;
    }
    vmEmployee.id = mEmployee.id;
    vmEmployee.firstName = mEmployee.firstName;
    vmEmployee.middleInitial = mEmployee.middleInitial;
    vmEmployee.lastName = mEmployee.lastName;
    vmEmployee.dateOfBirth = mEmployee.dob!=null?new Date(mEmployee.dob).toDateString():"Date not provided!!!";
    vmEmployee.dateOfEmployment = mEmployee.doj!=null?new Date(mEmployee.doj).toDateString():"Date not provided!!!";
    vmEmployee.status = mEmployee.status==="ACTIVE"?true:false;
    return vmEmployee;
  } 
  public static formateData(employee:Employee){
    if(employee==null){
      return new Employee();
    }
    employee.dateOfBirth = employee.dateOfBirth!=null?new Date(employee.dateOfBirth).toISOString().substr(0, 10):"Date not provided!";
    employee.dateOfEmployment = employee.dateOfEmployment!=null?new Date(employee.dateOfEmployment).toISOString().substr(0, 10):"Date not provided!";
    return employee;
  }
}
