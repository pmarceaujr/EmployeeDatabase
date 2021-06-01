
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
                console.log(`Updating employee: ${empName}, Emp ID: ${empId} to report to: ${mgrName}, Emp ID: ${mgrId}`)
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




module.exports = {
    mgrToGetNewEmp
    //,
    //delRole,
    //delEmployee

}