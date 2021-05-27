const figlet = require("figlet")
const colors = require("ansi-colors");

//figlet used to create the employee database banner
//ansi-colors ued to add color to the banner
figletBanner = async () => {
    return new Promise((resolve, reject) => {
        figlet('Employee', function (err, data1) {
            if (err) {
                console.log('Something went wrong...');
                reject(err);
            }
            console.clear()
            console.log('')
            console.log('Welcome to the......')
            console.log('*************************************************')
            console.log(colors.bold.green(data1))
            figlet('Database', function (err, data3) {
                if (err) {
                    console.log('Something went wrong...');
                    reject(err);
                }
                console.log(colors.bold.green(data3))
                //
                console.log('*************************************************\n')
                console.log("Starting the Employee DB, please hold.......");
                console.log('')
                resolve(1)
            })
        })


    })
}

module.exports = {
    figletBanner
}