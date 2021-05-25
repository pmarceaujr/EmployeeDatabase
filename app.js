//Let's get the required packages out of the way first
const figlet = require("figlet")
const colors = require("ansi-colors");
const inquirer = require('inquirer');
const connectDB = require('./includes/connectionDB.js')

//figlet used to create the employee database banner
//ansi-colors ued to add color to the banner
figlet('Employee\nDatabase', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(colors.bold.bgCyan(data))
});

//prompt the user for login credentials



connectDB.connectToDB();



//start the Employee Database application
const initEmployeeDB = () => {
    const addEmployee = () => {
        console.log("Starting the Employee DB, please hold.......");
        return inquirer.prompt([
            {
                type: "list",
                name: "role",
                message: "Please select the role of the next team member:",
                choices: ['Engineer', 'Intern', 'End Team Data Entry']
            }
        ]).then(userChoice => {
            switch (userChoice.role) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        }
        )
    }
}
