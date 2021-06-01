//This file is a collection of functions to select and display the Departments, Roles and Employees

//Add required mySQL package and execute connection
const colors = require("ansi-colors");
const conTable = require('console.table')
const inquirer = require('inquirer');
const mysql = require('mysql')
const getData = require('./getFunctions.js');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Password',
    database: 'employeeDB'
});

const viewDepartments = async () => {
    return new Promise((resolve, reject) => {
        console.log('')
        console.log(colors.bold.blue('Here is a list of the departments...'))
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
        console.log('')
        console.log(colors.bold.blue('Here is a list of the roles...'))
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
        console.log('')
        console.log(colors.bold.blue('Here is a list of the employees...'))
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
        console.log('')
        console.log(colors.bold.blue('Here is a list of the full employee records...'))
        connection.query(`SELECT emp.id AS "Emp ID"
                        , CONCAT(emp.first_name,' ',emp.last_name) AS "Employee Name"
                        , salary AS "Salary"
                        , dept_name AS "Department"                        
                        , title AS "Role Title"
                        , CONCAT(mgr.first_name,' ',mgr.last_name) AS  "Manager Name" 
                        FROM employees emp left join employees mgr on emp.manager_id = mgr.id, roles rle, departments dpt
                        where  (dept_id = dpt.id and mgr.id is null and emp.role_id = rle.id ) OR
                        (dept_id = dpt.id and mgr.id = emp.manager_id and emp.role_id = rle.id )
                        ORDER by emp.id`, (err, res) => {
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

const viewDeptBudgets = async () => {
    return new Promise((resolve, reject) => {
        console.log('')
        console.log(colors.bold.blue('Here is a list of the budgets by department...'))
        connection.query(`SELECT departments.dept_name AS "Department Name", count(employees.id) AS "Nbr Employees", SUM(salary) AS 'Total Dept. Budget'
                            FROM  employees
                            LEFT JOIN roles ON employees.role_id=roles.id, departments
                            WHERE roles.dept_id = departments.id
                            GROUP BY dept_name; `, (err, res) => {
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

const viewEmpsByManager = async () => {
    return new Promise((resolve, reject) => {
        console.log('')
        console.log(colors.bold.blue('Here is a list of ALL employees grouped by manager...'))
        connection.query(`SELECT 
                        CONCAT(mgr.first_name,' ',mgr.last_name) AS  "Manager Name"
                        ,CONCAT(emp.first_name,' ',emp.last_name) AS "Employee Name"
                        , dept_name AS "Department"                        
                        , title AS "Role Title" 
                        FROM employees emp left join employees mgr on emp.manager_id = mgr.id, roles rle, departments dpt
                        where  (dept_id = dpt.id and mgr.id is null and emp.role_id = rle.id ) OR
                        (dept_id = dpt.id and mgr.id = emp.manager_id and emp.role_id = rle.id )
                        ORDER by mgr.id `, (err, res) => {
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

const viewManagersEmps = async () => {
    let allMgrRecs = await getData.getAllManagers()
    const allMgrData = allMgrRecs.map((mgr) => ({ value: mgr.manager_id, name: mgr.manager_name }));
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                name: "selManager",
                type: "list",
                message: "Please select the manager to see a list of direct reports:",
                choices: allMgrData,
                validate: empManagerInput => {
                    if (empManagerInput) {
                        return true;
                    } else {
                        return "Manager is required. Please select the manager to see a list of direct reports::"
                    }
                }
            }
        ])
            .then((response) => {
                const mgrRecSelected = allMgrData.filter(function (item) {
                    return item.value === response.selManager;
                });
                var value = mgrRecSelected[0]["name"]
                console.log('')
                console.log(colors.bold.blue(`Showing direct reports for: ${value} `))
                connection.query(`SELECT 
                            CONCAT(mgr.first_name,' ',mgr.last_name) AS  "Manager Name"
                            ,CONCAT(emp.first_name,' ',emp.last_name) AS "Employee Name"
                            , dept_name AS "Department"                        
                            , title AS "Role Title" 
                            FROM employees emp left join employees mgr on emp.manager_id = mgr.id, roles rle, departments dpt
                            where  
                            (dept_id = dpt.id and mgr.id = emp.manager_id and emp.role_id = rle.id ) and emp.manager_id = ? 
                            ORDER by mgr.id`, [response.selManager], (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        if (res.length) {
                            console.table(res)
                        }
                        else {
                            console.log(colors.bold.red(`There are no direct reports for: ${value}.  This employee is not a manager.`))
                        }
                        resolve(res);
                    }

                })
            })
    });
};


module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    viewFullEmpRecs,
    viewDeptBudgets,
    viewManagersEmps,
    viewEmpsByManager
}