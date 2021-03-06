//Let's get the required packages out of the way first
const banner = require('./includes/figlet.js');
const colors = require("ansi-colors");
const inquirer = require('inquirer');
const connectDB = require('./includes/connectionDB.js');
const viewData = require('./includes/viewFunctions.js');
const addData = require('./includes/addFunctions.js');
const delData = require('./includes/deleteFunctions.js');
const updData = require('./includes/updateFunctions.js');

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
            choices: [
                new inquirer.Separator(' '),
                new inquirer.Separator(colors.bold.magenta('---- I JUST WANT TO SEE THE DATA ----')),
                'View Departments',
                'View Roles',
                'View Employees',
                'View Full Employee Records',
                'View Employees For A Manager',
                'View All Employees Grouped By Manager',
                'View Department Budget',
                new inquirer.Separator(' '),
                new inquirer.Separator(colors.bold.magenta('---- I JUST WANT TO ADD NEW THINGS ----')),
                'Add Department',
                'Add Role',
                'Add Employee',
                new inquirer.Separator(' '),
                new inquirer.Separator(colors.bold.magenta('---- I JUST WANT TO UPDATE THINGS ----')),
                'Update Employee',
                'Update Role',
                new inquirer.Separator(' '),
                new inquirer.Separator(colors.bold.magenta('---- I JUST WANT TO DELETE THINGS ----')),
                'Delete Department',
                'Delete Role',
                'Delete Employee',
                new inquirer.Separator(' '),
                new inquirer.Separator(colors.bold.magenta("---- I'VE HAD ENOUGH...TAKE ME AWAY ----")),
                'Exit'
            ],
            pageSize: 30

        }
    ]);
    switch (selection.userSelection) {
        case "View Departments":
            console.log(colors.bold.blue("You selected: 'View Departments'"))
            await viewData.viewDepartments();
            userSelections();
            break;
        case "View Roles":
            console.log(colors.bold.blue("You selected: 'View Roles'"))
            await viewData.viewRoles();
            userSelections();
            break;
        case "View Employees":
            console.log(colors.bold.blue("You selected: 'View Employees'"))
            await viewData.viewEmployees();
            userSelections();
            break;
        case "View Full Employee Records":
            console.log(colors.bold.blue("You selected: 'View Full Employee Records'"))
            await viewData.viewFullEmpRecs();
            userSelections();
            break;
        case "View Employees For A Manager":
            console.log(colors.bold.blue("You selected: 'View Employees For A Manager'"))
            await viewData.viewManagersEmps();
            userSelections();
            break;
        case "View All Employees Grouped By Manager":
            console.log(colors.bold.blue("You selected: 'View All Employees Grouped By Manager'"))
            await viewData.viewEmpsByManager();
            userSelections();
            break;
        case "View Department Budget":
            console.log(colors.bold.blue("You selected: 'View Department Budget'"))
            await viewData.viewDeptBudgets();
            userSelections();
            break;
        case "Add Department":
            console.log(colors.bold.green("You selected: 'Add Department'"))
            await addData.addDepartment();
            userSelections();
            break;
        case "Add Role":
            console.log(colors.bold.green("You selected: 'Add Role'"))
            await addData.addRole();
            userSelections();
            break;
        case "Add Employee":
            console.log(colors.bold.green("You selected: 'Add Employee'"))
            await addData.addEmployee();
            userSelections();
            break;
        case "Update Employee":
            console.log(colors.bold.yellow("You selected: 'Update Employee'"))
            await updData.mgrToGetNewEmp();
            userSelections();
            break;
        case "Update Role":
            console.log(colors.bold.yellow("You selected: 'Update Role'"))
            await updData.updateRoleForEmp();
            userSelections();
            break;
        case "Delete Department":
            console.log(colors.bold.red("You selected: 'Delete Department'"))
            await delData.delDepartment();
            userSelections();
            break;
        case "Delete Role":
            console.log(colors.bold.red("You selected: 'Delete Role'"))
            await delData.delRole();
            userSelections();
            break;
        case "Delete Employee":
            console.log(colors.bold.red("You selected: 'Delete Employee'"))
            await delData.delEmployee();
            userSelections();
            break;
        case "Exit":
            console.log(colors.bold.red("Good-Bye!"))
            break;
        default:
            console.log("Invalid entry selected")
            userSelections();
            break;
    }
}

startApp();
