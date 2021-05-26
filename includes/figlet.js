const figlet = require("figlet")
const colors = require("ansi-colors");

//figlet used to create the employee database banner
//ansi-colors ued to add color to the banner
figletBanner = async () => {
    figlet('Employee\nDatabase', function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.log(err);
        }
        console.log('*************************************************')
        console.log(colors.bold.green(data))
        console.log('*************************************************\n')
        console.log("Starting the Employee DB, please hold.......");
    });
}

module.exports = {
    figletBanner
}