# Employee Management Application
A GUI application to support limited functionality regarding employee managment. The application interact with backend server to make ReST API calls. 
The technology stack.
Angular 4, Spring-Boot, MongoDB, bootstrap
Front end and back-end are two applications.
## ReST Services
GET  api/employees/all             -Gets all employess status=active + inactive
GET  api/employees                 -Gets all the active employees
GET  api/employees/{id}            -Gets a single active employee
POST api/employee                  -Create a new employee
PUT  api/employees/{id}            -Update an employee
DELETE api/employees/{id}          -Delete an employee (by status=inactive)
DELETE api/actual/employees/{id}   -Delete an employee from DB
DELETE api/actual/Employees        -Delete all the employees from DB
POST api/employees/Injest          -Bulk create list of employees from a file

## Functionality supported
### Employee Injest: 
To import list of employees from the pre-filled csv formatted file. 
Steps:
 1. Click on button "Employee Injest"
 2. Browse the pre-filled comma (,) separated file as per below format
 3. The CSV format is described below. Click Here to get Template [a link](https://github.com/kameshGithub/empmgmtweb/blob/master/Employees.csv)
```
EmpID, First Name, Middle Initial, Last Name, Date of Birth(YYYY-DD), Date of Employment(YYYY-MM-DD)
```
 4. Click on "Submit"
 5. On success a message will be displayed and user can navigate to view all the list of employees.
 6. By default the employees created will be with status="ACTIVE"
 7. It uses POST method to send file as multipart.

### View All Employees: 
This button will use GET ReST to retrieve all the employees without checking status="ACTIVE" OR "INACTIVE". 
Note: This functionality was not demanded but implemented to ease the use of app to verify the data. This button can be removed as required.

### View (ACTIVE) Employees:
Will return all the employees with status=ACTIVE. Uses GET Method.
From this screen, user can edit the particular employee or delete the same (by changing status to INACTIVE internally).
```
Note: When user click on delete, please provide user/password as admin/admin.
```
### Add Employee:
Enable adding employee entry one by one. 

### Edit
Edit uses a PUT method to update the details of the employee. User will not be displayed the "Status" field and also not able to change the same.
## Running
Open the live heroku link of GUI: [https://empmgmtweb.herokuapp.com/]
Open the ReST Server link on Heroku: [https://empmgmt.herokuapp.com/]
Mongo DB link on Heroku: [https://www.mlab.com/databases/heroku_qzf0zdjp/collections/employee]





