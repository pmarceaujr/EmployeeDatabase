//This file is a collection of functions to select and display the Departments, Roles and Employees

//Add required mySQL package and execute connection
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Password',
    database: 'employeeDB',
});

const viewDepartments = async () => {
    return new Promise((resolve, reject) => {
        console.log('Here is a list of the departments...')
        connection.query('SELECT id as "DEPT ID", dept_name AS "Department Name" FROM departments', (err, res) => {
            if (err) {
                reject(err);
            }
            else {
                console.table(res)
                resolve(res);
            }
        })
    });
};

const viewRoles = async () => {
    return new Promise((resolve, reject) => {
        console.log('Here is a list of the roles...')
        connection.query('SELECT id AS "ROLE ID", title AS "ROLE TITLE", salary AS "SALARY", dept_id AS "DEPT ID" FROM roles', (err, res) => {
            if (err) {
                reject(err);
            }
            else {
                console.table(res)
                resolve(res);
            }
        })
    });
};

const viewEmployees = async () => {
    return new Promise((resolve, reject) => {
        console.log('Here is a list of the employees...')
        connection.query('SELECT id AS "EMP ID", first_name AS "FIRST NAME", last_name AS "LAST NAME", role_id AS "ROLE ID", manager_id AS "MANAGER ID" FROM employees', (err, res) => {
            if (err) {
                reject(err);
            }
            else {
                console.table(res)
                resolve(res);
            }
        })
    });
};

const viewFullEmpRecs = async () => {
    return new Promise((resolve, reject) => {
        console.log('Here is a list of the full employee records...')
        connection.query(`SELECT emp.id AS "EMP ID"
                , CONCAT(emp.first_name,' ',emp.last_name) AS "EMPLOYEE NAME"
                , salary AS "SALARY"
                , dept_name AS "DEPARTMENT"                        
                , title AS "ROLE TITLE"
                , CONCAT(mgr.first_name,' ',mgr.last_name) AS  "MANAGER NAME" 
                FROM employees emp, roles rle, departments dpt, employees mgr
                where dept_id = dpt.id and mgr.id = emp.manager_id and emp.role_id = rle.id order by emp.id `, (err, res) => {
            if (err) {
                reject(err);
            }
            else {
                console.table(res)
                resolve(res);
            }
        })
    });
};
module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    viewFullEmpRecs
}