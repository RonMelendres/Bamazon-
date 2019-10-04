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
    
    connection.query("SELECT * FROM products", function (err, res) {

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

        console.log(table.toString());
        questions();
    })
}

function questions() {
    inquirer
        .prompt([

            {
                name: "userChoice1",
                type: "number",
                message: "Welcome to Bamazon! Which item would you like? (Please select the Item ID)\n",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;

                    }
                    // console.log("Please choose the appropriate ID");
                    // afterConnection()
                    return false;
                }
            },

        ])
        .then(function (userInput) {
            var query = "SELECT item_id FROM products";
            connection.query(query, { userChoice1: userInput.userChoice1 }, function (err, res) {

                for (var i = 0; i < res.length; i++) {
                    if (userInput.userChoice1 === res[i].item_id) {
                        inquirer.prompt([
                            {
                                name: "quantity",
                                type: "number",
                                message: "How many would you like?",
                                validate: function (value) {
                                    if (isNaN(value) === false) {
                                        return true;
                                    }
                                    return false;
                                }
                            },

                        ])
                            .then(function (userQuantity) {
                                updateQuantity(userInput.userChoice1, userQuantity.quantity)
                            });
                    }
                    // else  {
                    //     console.log("There is not enough products")
                    //     afterConnection()
                    // }
                };
            })
        });
}

function updateQuantity(product_id, product_quantity) {
    connection.query("SELECT * FROM products WHERE item_id =?", [product_id],
        function (err, res) {
            if (err) throw err;
            if (product_quantity > res[0].stock_quantity) {
                console.log("There is not enough products")
                afterConnection()
            }
            else {

                var newQuantity = res[0].stock_quantity - product_quantity
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newQuantity
                        },
                        {
                            item_id: product_id
                        }
                    ]
                )
                console.log("Purchased " + product_quantity)
                afterConnection()
               
            }
        })

}