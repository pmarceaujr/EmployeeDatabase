
//This file is a collection of functions to ADD records to the DB tables: Departments, Roles and Employees

//Add required packages and execute connection
const inquirer = require('inquirer');
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Password',
    database: 'employeeDB',
});


const addDepartment = async () => {
    return new Promise((resolve, reject) => {
        console.log("here")
        inquirer.prompt([
            {
                name: "newDepartment",
                type: "input",
                message: "Please enter the name of the new department:",
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        return "Department name is required. Please enter the name of the new department:"
                    }
                }
            }
        ])
            .then((response) => {
                console.log(`Adding new department: ${response.newDepartment} `)
                connection.query("INSERT INTO departments SET ?",
                    {
                        dept_name: response.newDepartment
                    }, (err, res) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            console.table(`Success, the new department: ${response.newDepartment} has been added. `)
                            resolve(res);
                        }
                    })
            })
    });
};


const addRole = async () => {
    return new Promise((resolve, reject) => {
        console.log("here")
        inquirer.prompt([
            {
                name: "newRoleName",
                type: "input",
                message: "Please enter the name of the new role:",
                validate: roleNameInput => {
                    if (roleNameInput) {
                        return true;
                    } else {
                        return "Role name is required. Please enter the name of the new role:"
                    }
                }
            },
            {
                name: "newRoleSalary",
                type: "input",
                message: "Please enter the salary of the new role:",
                validate: roleSalaryInput => {
                    if (roleSalaryInput) {
                        return true;
                    } else {
                        return "Role salary is required. Please enter the salary of the new role:"
                    }
                }
            },
            {
                name: "newRoleDeptId",
                type: "input",
                message: "Please enter the department of the new role:",
                validate: roleDeptInput => {
                    if (roleDeptInput) {
                        return true;
                    } else {
                        return "Role department is required. Please enter the department of the new role:"
                    }
                }
            },

        ])
            .then((response) => {
                console.log(`Adding new role: ${response.newRoleName} `)
                connection.query("INSERT INTO roles SET ?",
                    {
                        title: response.newRoleName,
                        salary: response.newRoleSalary,
                        dept_id: response.newRoleDeptId
                    }, (err, res) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            console.table(`Success, the new role: ${response.newRoleName} has been added. `)
                            resolve(res);
                        }
                    })
            })
    });
};

const addEmployee = async () => {
    return new Promise((resolve, reject) => {
        console.log("here")
        inquirer.prompt([
            {
                name: "newEmpFirstName",
                type: "input",
                message: "Please enter the first name of the new employee:",
                validate: empFirstNameInput => {
                    if (empFirstNameInput) {
                        return true;
                    } else {
                        return "Employee first name is required. Please enter the first name of the new employee:"
                    }
                }
            },
            {
                name: "newEmpLastName",
                type: "input",
                message: "Please enter the last name of the new employee:",
                validate: empLastNameInput => {
                    if (empLastNameInput) {
                        return true;
                    } else {
                        return "Employee last name is required. Please enter the last name of the new employee:"
                    }
                }
            },
            {
                name: "newEmpRole",
                type: "input",
                message: "Please enter the first name of the new employee:",
                validate: empRoleInput => {
                    if (empRoleInput) {
                        return true;
                    } else {
                        return "Employee role is required. Please enter the role of the new employee:"
                    }
                }
            },
            {
                name: "newEmpManager",
                type: "input",
                message: "Please enter the manager of the new employee:",
                validate: empManagerInput => {
                    if (empManagerInput) {
                        return true;
                    } else {
                        return "Employee manager is required. Please enter the manager of the new employee:"
                    }
                }
            }
        ])
            .then((response) => {
                console.log(`Adding new employee: ${response.newEmpFirstName}  ${response.newEmpLastName} `)
                connection.query("INSERT INTO departments SET ?",
                    {
                        first_name: response.newEmpFirstName,
                        last_name: response.newEmpLastName,
                        role_id: response.newEmpRole,
                        manager_id: response.newEmpManager
                    }, (err, res) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            console.table(`Success, the new employee: ${response.newEmpFirstName}  ${response.newEmpLastName} has been added. `)
                            resolve(res);
                        }
                    })
            })
    });
};




module.exports = {
    addDepartment,
    addRole,
    addEmployee

}