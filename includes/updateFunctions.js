
//This file is a collection of functions to DELETE records to the DB tables: Departments, Roles and Employees

//Add required packages and execute connection
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
    database: 'employeeDB',
});


const mgrToGetNewEmp = async () => {
    let allEmpRecs = await getData.getAllEmployees()
    const allEmpData = allEmpRecs.map((emp) => ({ value: emp.employee_id, name: emp.employee_name }));
    let allMgrRecs = await getData.getAllManagers()
    const allMgrData = allMgrRecs.map((mgr) => ({ value: mgr.manager_id, name: mgr.manager_name }));
    let mgrName = ''
    let mgrId = ''
    let empName = ''
    let empId = ''
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                name: "empToGetNewMgr",
                type: "list",
                message: "Please select the name of the employee you would like to change manager:",
                choices: allEmpData,
            },
            {
                name: "mgrToGetNewEmp",
                type: "list",
                message: "Please select the name of the manager you would like to assign to the employee:",
                choices: allMgrData,
            }
        ])

            .then((response) => {
                const empRecSelected = allEmpData.filter(function (item) {
                    return item.value === response.empToGetNewMgr;
                });
                //console.log(response)
                const mgrRecSelected = allMgrData.filter(function (item) {
                    return item.value === response.mgrToGetNewEmp;
                });
                empName = empRecSelected[0]["name"]
                empId = response.empToGetNewMgr;
                mgrName = mgrRecSelected[0]["name"]
                mgrId = response.mgrToGetNewEmp;
                console.log('')
                console.log(colors.bold.blue(`Updating employee: ${empName}, Emp ID: ${empId} to report to: ${mgrName}, Emp ID: ${mgrId}`))
                connection.query("UPDATE employees set ? WHERE ?",
                    [{
                        manager_id: parseInt(mgrId)
                    },
                    {
                        id: parseInt(empId)
                    }],
                    (err, res) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            console.table(`Success, the employee: ${empName} now reports to: ${mgrName}. `)
                            resolve(res);
                        }
                    })

            });
    });

};

const updateRoleForEmp = async () => {
    let allEmpRecs = await getData.getAllEmployees()
    const allEmpData = allEmpRecs.map((emp) => ({ value: emp.employee_id, name: emp.employee_name }));
    let allRoleRecs = await getData.getAllRoles()
    const allRoleData = allRoleRecs.map((rle) => ({ value: rle.role_id, name: rle.role_title }));
    let roleName = ''
    let roleId = ''
    let empName = ''
    let empId = ''
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                name: "empToGetNewRole",
                type: "list",
                message: "Please select the name of the employee you would like to change roles:",
                choices: allEmpData,
            },
            {
                name: "roleToGetNewEmp",
                type: "list",
                message: "Please select the name of the role you would like to assign to the employee:",
                choices: allRoleData,
            }
        ])

            .then((response) => {
                const empRecSelected = allEmpData.filter(function (item) {
                    return item.value === response.empToGetNewRole;
                });
                //console.log(response)
                const roleRecSelected = allRoleData.filter(function (item) {
                    return item.value === response.roleToGetNewEmp;
                });
                console.log(empRecSelected)
                console.log(roleRecSelected)
                empName = empRecSelected[0]["name"]
                empId = response.empToGetNewRole;
                roleName = roleRecSelected[0]["name"]
                roleId = response.roleToGetNewEmp;
                console.log('')
                console.log(colors.bold.blue(`Updating employee: ${empName}, Emp ID: ${empId} to have new role: ${roleName}, Role ID: ${roleId}`))
                connection.query("UPDATE employees set ? WHERE ?",
                    [{
                        role_id: parseInt(roleId)
                    },
                    {
                        id: parseInt(empId)
                    }],
                    (err, res) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            console.table(`Success, the employee: ${empName} now has the role: ${roleName}. `)
                            resolve(res);
                        }
                    })

            });
    });

};


module.exports = {
    mgrToGetNewEmp,
    updateRoleForEmp
    //,
    //delRole,
    //delEmployee

}