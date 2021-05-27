
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
        // resolve(1)
        // })
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
        // resolve(1)
        // })
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
        // resolve(1)
        // })
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
                            console.table("Success")
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