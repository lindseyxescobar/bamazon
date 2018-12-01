const fs = require('fs');

require('dotenv').config();
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    // Your port; if not 3306
    port: 3306,

    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "bamazon_db"

});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayItems();

});

function displayItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.table(res);
        // call the next function
        promptUser();

    });
}

// function start() {
//     inquirer
//         .prompt([
//             {
//                 type: 'choices',
//                 message: "Are you a customer or employee?",
//                 choices: ["Customer", "Employee"],
//                 name: "userType"

//             }
//         ])
//         .then(answers =>{
//            console.log(answer.choices)
//         })
// }

//Customer Function 
function promptUser() {
    inquirer
        .prompt([
            /* Pass your questions in here */
            {
                type: 'input',
                message: 'What item would you like to order? ',
                name: "orderId"
            },
            {
                type: 'input',
                message: "How many of that item would you like to order?",
                name: "qty"
            }
        ])
        .then(answers => {
            // console.log(answers);
            // console.log(answers.orderId);
            // console.log(answers.qty);

            connection.query("SELECT * FROM products WHERE item_id = " + answers.orderId, function (err, res) {

                if (answers.qty <= res[0].qty) {
                    console.log("Item in stock!");
                    const newQuant = res[0].qty - answers.qty;
                    connection.query("UPDATE products SET qty = " + newQuant + " WHERE item_id = " + answers.orderId, function (error, response) {
                        const total = res[0].price * answers.qty;
                        console.log("Your total is: $" + total);
                    });
                } else {
                    console.log("Insufficient quantity! Please choose a lower quantity")
                }
            })
        });

}
//Employee View
//Supervisor View
