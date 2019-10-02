var mysql = require("mysql");
// var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "BamazonDB"
});

connection.connect(function(err,) {
    if(err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw(err);
        console.log(res);
        connection.end();
    });
    var table = new Table({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
             , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
             , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
             , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
    });
     
    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    table.push(
        ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']
      , [1, 'Iron Sword', 'Swords', 600, 50]
      , [2, 'Steel Sword', 'Swords', 1050, 25]
    );
     
    console.log(table.toString());
}

// var table = new Table({
//     chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
//          , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
//          , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
//          , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
// });
 
// // table is an Array, so you can `push`, `unshift`, `splice` and friends
// table.push(
//     ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']
//   , [1, 'Iron Sword', 'Swords', 600, 50]
//   , [2, 'Steel Sword', 'Swords', 1050, 25]
// );
 
// console.log(table.toString());