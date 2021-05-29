
//This file is a collection of functions to DELETE records to the DB tables: Departments, Roles and Employees

//Add required packages and execute connection
const getData = require('./getFunctions.js');
const inquirer = require('inquirer');
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Password',
    database: 'employeeDB',
});


const delDepartment = async () => {
    let allDeptRecs = await getData.getAllDepartments()
    const allDeptData = allDeptRecs.map((dept) => ({ value: dept.dept_id, name: dept.dept_name }));
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                name: "delDepartment",
                type: "list",
                message: "Please select the name of the department you woulo like to delete::",
                choices: allDeptData,
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        return "Department name is required. Please select the name of the department you would like to delete:"
                    }
                }
            }
        ])
            .then((response) => {
                const deptRecSelected = allDeptData.filter(function (item) {
                    return item.value === response.delDepartment;
                });
                var value = deptRecSelected[0]["name"]
                console.log(value)
                console.log(`Deleting department: ${value} `)
                connection.query("DELETE FROM departments WHERE ?",
                    {
                        id: response.delDepartment
                    }, (err, res) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            console.table(`Success, the department: ${value} has been deleted. `)
                            resolve(res);
                        }
                    })
            })
    });
};


const delRole = async () => {
    let allRoleRecs = await getData.getAllRoles()
    const allRoleData = allRoleRecs.map((role) => ({ value: role.role_id, name: role.role_title }));
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                name: "delRole",
                type: "list",
                message: "Please select the role you would like to delete:",
                choices: allRoleData,
                validate: roleDeptInput => {
                    if (roleDeptInput) {
                        return true;
                    } else {
                        return "Role is required. Please enter the role you would like to delete:"
                    }
                }
            },

        ])
            .then((response) => {
                const roleRecSelected = allRoleData.filter(function (item) {
                    return item.value === response.delRole;
                });
                var value = roleRecSelected[0]["name"]
                console.log(value)
                console.log(`Deleting  role: ${value} `)
                connection.query("DELETE FROM roles WHERE ?",
                    {
                        id: response.delRole
                    }, (err, res) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            console.table(`Success, the  role: ${value} has been deleted. `)
                            resolve(res);
                        }
                    })
            })
    });
};

const delEmployee = async () => {
    let allEmpRecs = await getData.getAllEmployees()
    const allEmpData = allEmpRecs.map((emp) => ({ value: emp.employee_id, name: emp.employee_name }));
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                name: "delEmployee",
                type: "list",
                message: "Please select the employee you would like to delete:",
                choices: allEmpData,
                validate: empManagerInput => {
                    if (empManagerInput) {
                        return true;
                    } else {
                        return "Employee is required. Please select the employee you would like to delete:"
                    }
                }
            }
        ])
            .then((response) => {
                const empRecSelected = allEmpData.filter(function (item) {
                    return item.value === response.delEmployee;
                });
                var value = empRecSelected[0]["name"]
                console.log(value)
                console.log(`Deleting employee: ${value} `)
                connection.query("DELETE FROM employees WHERE ?",
                    {
                        id: response.delEmployee
                    }, (err, res) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            console.table(`Success, the  employee: ${value} has been deleted. `)
                            resolve(res);
                        }
                    })
            })
    });
};




module.exports = {
    delDepartment,
    delRole,
    delEmployee

}