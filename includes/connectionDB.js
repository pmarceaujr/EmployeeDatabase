const mysql = require('mysql')
const inquirer = require('inquirer');

//User login function to prompt user for login credentials and then connect to the DB

userLogin = async () => {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
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
        ])

            .then((response) => {
                return response
            })
            .then((response) => {
                resolve(connectToDB(response.username, response.password, response.database))
            })

    })
}




connectToDB = async (user, password, database) => {
    const connection = mysql.createConnection({
        host: 'localhost',

        // Your port, if not 3306
        port: 3306,

        // Your username
        user: user, //'root',

        // Be sure to update with your own MySQL password!
        password: password, //'Password',
        database: database, //'ice_creamDB',
    });

    connection.connect((err) => {
        //console.log(connection)
        if (err) throw err;

        //console.log(`connected as id ${connection.threadId}`);
        return (`connected as id ${connection.threadId}`);

        //connection.end();
    });
}

module.exports = {
    userLogin//, connectToDB
}
