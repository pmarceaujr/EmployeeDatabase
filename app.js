//Let's get the required packages out of the way first
const banner = require('./includes/figlet.js');
const inquirer = require('inquirer');
const connectDB = require('./includes/connectionDB.js');
const viewData = require('./includes/viewFunctions.js');

//start the Employee Database application
startApp = async () => {
    await banner.figletBanner()
    await connectDB.userLogin();
    await userSelections()
}

userSelections = async () => {
    const selection = await inquirer.prompt([
        {
            type: "list",
            name: "userSelection",
            message: "Please select the activity you would like to execute:",
            choices: ['View Departments', 'View Roles', 'View Employees', 'View Full Employee Records',
                'Add Departments', 'Add Roles', 'Add Employees', 'Update Employee', 'Update Roles',
                'Delete Departments', 'Delete Roles', 'Delete Employees', 'View Department Budget', "Exit"]
        }
    ]);
    switch (selection.userSelection) {
        case "View Departments":
            console.log("View Departments")
            await viewData.viewDepartments();
            userSelections();
            break;
        case "View Roles":
            console.log("View Roles")
            await viewData.viewRoles();
            userSelections();
            break;
        case "View Employees":
            console.log("View Employees")
            await viewData.viewEmployees();
            userSelections();
            break;
        case "View Full Employee Records":
            console.log("View Full Employee Records")
            await viewData.viewEmployees();
            userSelections();
            break;
        case "Add Department":
            console.log("Add Department")
            addDepartment();
            userSelections();
            break;
        case "Add Role":
            console.log("Add Role")
            addRole();
            userSelections();
            break;
        case "Add Employee":
            console.log("Add Employee")
            addEmployee();
            userSelections();
            break;
        case "Update Employee":
            console.log("Update Employee")
            updateEmpRole();
            userSelections();
            break;
        case "Update Role":
            console.log("Update Role")
            updateEmpRole();
            userSelections();
            break;
        case "Delete Department":
            console.log("Delete Department")
            deleteDepartment();
            userSelections();
            break;
        case "Delete Role":
            console.log("Delete Role")
            deleteRole();
            userSelections();
            break;
        case "Delete Employee":
            console.log("Delete Employee")
            deleteEmployee();
            userSelections();
            break;
        case "View Department Budget":
            console.log("View Department Budget")
            viewDeptBudget();
            userSelections();
            break;
        case "Exit":
            console.log("Good-Bye!")
            break;
        default:
            break;
    }
}

startApp();
