//This file is a collection of functions to get values from the DB tables and  and display the Departments, Roles and Employees

//Add required mySQL package and execute connection
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Password',
    database: 'employeeDB',
});

const getAllDepartments = async () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT id as "dept_id", dept_name FROM departments', (err, res) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        })
    });
};

const getAllRoles = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT id AS "role_id", title AS "role_title" FROM roles', (err, res) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        })
    })
};

const getAllEmployees = async () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT id AS "employee_id", CONCAT(first_name," ",last_name) AS "employee_name" FROM employees', (err, res) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        })
    });
};

const getAllManagers = async () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT id AS "manager_id", CONCAT(first_name," ",last_name) AS "manager_name" FROM employees', (err, res) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        })
    });
};

module.exports = {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    getAllManagers
    //,
    //getAllFullEmpRecs
};