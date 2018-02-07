# Employee Management Application
A GUI application to support limited functionality regarding employee managment. The application interact with backend server to make ReST API calls. 
The technology stack.
Angular 4, Spring-Boot, MongoDB, bootstrap
Front end and back-end are two applications.
## ReST Services
1. GET  api/employees/all             -Gets all employess status=active + inactive
2. GET  api/employees                 -Gets all the active employees
3. GET  api/employees/{id}            -Gets a single active employee
4. POST api/employee                  -Create a new employee
5. PUT  api/employees/{id}            -Update an employee
6. DELETE api/employees/{id}          -Delete an employee (by status=inactive)
7. DELETE api/actual/employees/{id}   -Delete an employee from DB
8. DELETE api/actual/Employees        -Delete all the employees from DB
9. POST api/employees/Injest          -Bulk create list of employees from a file

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
## Build from source
### Mongo DB
1. Start the mongo db
2. Get the monogo db related setting to update in the application

### GUI Application
1. Copy source
```sh
mkdir fe
cd fe
git clone https://github.com/kameshGithub/empmgmtweb.git
```
2. Edit files
```
1. Open .\src\app\employees\employee.service.ts  and go to line 12 to update the name of the server:port of the ReST server that you are running
```
3. Build/Run
```
npm run build
npm start 
```
4. The server will be launched at http://localhost:8080/

### ReST Application
1. Copy source
```sh
mkdir be
cd be
git clone https://github.com/kameshGithub/empmgmt.git
```
2. Till the external configuration or proxy/gateway/service discovery feature is implemented, below manual configuration is required.
```
1. Go to .\src\main\java\com\kamesh\empmgmt\employee\controller\EmployeeController.java
2. Go to Line 46, and replace the URL of your Front-end application. 
3. Go to .\src\main\resources\application.properties  and change the required settings e.g. mongo db related.
```
3. If you already have one, change the configuration accordingly.
```
mvn compile
mvn spring:boot run
```
4. The server will be launched at http://localhost:5000/

## Live application access
1. Open the live heroku link of GUI: https://empmgmtweb.herokuapp.com/
2. Open the ReST Server link on Heroku: https://empmgmt.herokuapp.com/
3. Mongo DB link on Heroku: https://www.mlab.com/databases/heroku_qzf0zdjp/collections/employee





