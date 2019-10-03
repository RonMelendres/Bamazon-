var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "BamazonDB"
});

connection.connect(function (err, ) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    //connection.query === ASYNC (runner 1)
    connection.query("SELECT * FROM products", function (err, res) {
        // console.log(res)
        var table = new Table({
            chars: {
                'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
                , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
                , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
                , 'right': '║', 'right-mid': '╢', 'middle': '│'
            }
        });

        table.push(
            ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']
        )
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );

        };
        // console.log('im done querying')
        console.log(table.toString());
        inquirer
            .prompt([

                {
                    name: "introQuestion",
                    type: "number",
                    message: "Hello! Welcome to Bamazon Armoury. Which item would you like? (Please select the Item ID)\n\n",
                },
                {
                    name: "howMuchQuestion",
                    type: "number",
                    message: "How many would you like?",
                }
            ])
    })

}

/*
 synchronous vs asynchronous
 synchronous = in order
 asynchronous = things happen at the same time
*/


