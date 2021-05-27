let userName = ''
let password = ''
let dbName = ''

const mysql = require('mysql')
const inquirer = require('inquirer');

//User login function to prompt user for login credentials and then connect to the DB

userLogin = async () => {
    return new Promise((resolve, reject) => {
        /*inquirer.prompt([
            {
                name: "username",
                type: "input",
                message: "Please enter your user name (root):",
                validate: usernameInput => {
                    if (usernameInput) {
                        return true;
                    } else {
                        return "Username is required. Please enter your user name (root):"
                    }
                }
            },
            {
                name: "password",
                type: "password",
                message: "Please enter your password (Password):",
                validate: passwordInput => {
                    if (passwordInput) {
                        return true
                    }
                    else {
                        return "Password is required. Please enter your password (Password):"
                    }
                }
            },
            {
                type: "database",
                name: "database",
                message: "Please enter the database you would like to connect to (employeeDB):",
                validate: databaseInput => {
                    if (databaseInput) {
                        return true
                    } else {
                        return "Database name is required. Please enter the database you would like to connect to (employeeDB):"
                    }
                }
            },
        ])*/
        //resolve(connectToDB(userName, password, dbName))
        resolve(connectToDB('root', 'Password', 'employeeDB'))
        /*
            .then((response) => {
                return response
            })
            .then((response) => {
                userName = response.username
                password = response.password
                dbName = response.database
                resolve(connectToDB(userName, password, dbName))
            })
*/
    })
}

connectToDB = async (user, password, database) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: user, //'root',
        password: password, //'Password',
        database: database, //'ice_creamDB',
    });

    connection.connect((err) => {
        //console.log(connection)
        if (err) throw err;
        return (`connected as id ${connection.threadId}`);
    });
}

module.exports = {
    userLogin,
    connectToDB // connectToDB
}
