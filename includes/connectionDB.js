//let passWord = ''
//let userName = ''
//let dbName = ''




const mysql = require('mysql')
const connectToDB = (user, password, database) => {
    const connection = mysql.createConnection({
        host: 'localhost',

        // Your port, if not 3306
        port: 3306,

        // Your username
        user: 'root', //user, //'root',

        // Be sure to update with your own MySQL password!
        password: 'Password', //password, //'Password',
        database: 'employeesDB', //database, //'ice_creamDB',
    });

    connection.connect((err) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);
        connection.end();
    });
}

module.exports = {
    connectToDB
}
