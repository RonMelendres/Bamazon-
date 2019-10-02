DROP DATABASE IF EXISTS BamazonDB;

CREATE DATABASE BamazonDB;

USE BamazonDB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100) NULL,
    department_name VARCHAR (100) NULL,
    price DECIMAL (13,2),
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Iron Sword", "Swords", 600, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Steel Sword", "Swords", 1050, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Silver Sword", "Swords", 1500, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Iron Lance", "Lances", 550, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Steel Lance", "Lances", 1000, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Silver Lance", "Lances", 1450, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Iron Axe", "Axes", 500, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Steel Axe", "Axes", 950, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Silver Axe", "Axes", 1400, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bicycle", "Random", 10000000000, 1);