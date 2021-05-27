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
            console.log("You selected: 'View Departments'")
            await viewData.viewDepartments();
            userSelections();
            break;
        case "View Roles":
            console.log("You selected: 'View Roles'")
            await viewData.viewRoles();
            userSelections();
            break;
        case "View Employees":
            console.log("You selected: 'View Employees'")
            await viewData.viewEmployees();
            userSelections();
            break;
        case "View Full Employee Records":
            console.log("You selected: 'View Full Employee Records'")
            await viewData.viewFullEmpRecs();
            userSelections();
            break;
        case "Add Department":
            console.log("You selected: 'Add Department'")
            addDepartment();
            userSelections();
            break;
        case "Add Role":
            console.log("You selected: 'Add Role'")
            addRole();
            userSelections();
            break;
        case "Add Employee":
            console.log("You selected: 'Add Employee'")
            addEmployee();
            userSelections();
            break;
        case "Update Employee":
            console.log("You selected: 'Update Employee'")
            updateEmpRole();
            userSelections();
            break;
        case "Update Role":
            console.log("You selected: 'Update Role'")
            updateEmpRole();
            userSelections();
            break;
        case "Delete Department":
            console.log("You selected: 'Delete Department'")
            deleteDepartment();
            userSelections();
            break;
        case "Delete Role":
            console.log("You selected: 'Delete Role'")
            deleteRole();
            userSelections();
            break;
        case "Delete Employee":
            console.log("You selected: 'Delete Employee'")
            deleteEmployee();
            userSelections();
            break;
        case "View Department Budget":
            console.log("You selected: 'View Department Budget'")
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
