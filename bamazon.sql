DROP DATABASE IF EXISTS bamazon_db; 
CREATE DATABASE bamazon_db; 
USE bamazon_db; 

CREATE TABLE products (
	item_id INT AUTO_INCREMENT PRIMARY KEY,
    product VARCHAR(255), 
    dept VARCHAR(255), 
    price DECIMAL (10,2), 
    qty INT
);

INSERT INTO products (product, dept, price, qty) 
VALUES ("Fudgesicle", "Grocery", 3.99, 40), 
("Cat Food", "Pets", 14.50, 100), 
("Rubber Bands", "Office", 1.00, 50), 
("Cool Shoes", "Fashion", 70.00, 10), 
("Bananas", "Grocery", .50, 100), 
("Dog Leash", "Pets", 15.99, 25), 
("Laptop Charger", "Electronics",50.99, 10), 
("Pokemon Game", "Electronics", 60, 25), 
("Gel Pens", "Office", 3.99, 10), 
("Socks", "Fashion", 5, 5);

SELECT * FROM products; 