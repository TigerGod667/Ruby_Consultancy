create database ruby;
use ruby;
Create table users
(
	user_id int auto_increment primary key, 
	user_name varchar(50), 
	email_id varchar(50) unique, 
	phone_number varchar(10), 
	password varchar(500)
);

select * from users;
delete from users where user_id=3;
drop table users; 
Truncate users;

Create table orders
(
	order_id int auto_increment primary key, 
    user_id int, 
    date date,
    customer varchar(100),
    district varchar(100),
    description varchar(500),
    product_types varchar(100),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

Select * from orders;
Drop Table orders;

Create Table `PP Badam`(order_id int primary key,sales int, vapus int, free int, offers varchar(100));
Create Table `PP Rose`(order_id int primary key,sales int, vapus int, free int, offers varchar(100));
Create Table `PP Milky Badam`(order_id int primary key,sales int, vapus int, free int, offers varchar(100));
Create Table `PP Milkee Rose`(order_id int primary key,sales int, vapus int, free int, offers varchar(100));
Create Table `PP Jigar`(order_id int primary key,sales int, vapus int, free int, offers varchar(100));
Create Table `PP Pista`(order_id int primary key,sales int, vapus int, free int, offers varchar(100));
Create Table `PP Tendy Coconut`(order_id int primary key,sales int, vapus int, free int, offers varchar(100));
Create Table `PP Cashew`(order_id int primary key,sales int, vapus int, free int, offers varchar(100));
Create Table `PP Coffee Shot`(order_id int primary key,sales int, vapus int, free int, offers varchar(100));
Create Table `PP Vanilla`(order_id int primary key,sales int, vapus int, free int, offers varchar(100));
Create Table `PP Choco`(order_id int primary key,sales int, vapus int, free int, offers varchar(100));
Create Table `RGB Ruby Badam`(order_id int primary key,sales int, vapus int, free int, offers varchar(100));
Create Table `RGB Ruby Rose`(order_id int primary key,sales int, vapus int, free int, offers varchar(100));
Create Table `RGB Milky Badam`(order_id int primary key,sales int, vapus int, free int, offers varchar(100));
Create Table `RGB Choco`(order_id int primary key,sales int, vapus int, free int, offers varchar(100));
Create Table `PET Mango 600`(order_id int primary key,sales int, vapus int, free int, offers varchar(100));
Create Table `PET Mango 250`(order_id int primary key,sales int, vapus int, free int, offers varchar(100));
Create Table `PET Mango 200`(order_id int primary key,sales int, vapus int, free int, offers varchar(100));
Create Table `PET Zappy 250`(order_id int primary key,sales int, vapus int, free int, offers varchar(100));

Truncate Table orders;
Truncate Table `PP Badam`;
Truncate Table `PP Rose`;
Truncate Table `PP Milky Badam`;
Truncate Table `PP Milkee Rose`;
Truncate Table `PP Jigar`;
Truncate Table `PP Pista`;
Truncate Table `PP Tendy Coconut`;
Truncate Table `PP Cashew`;
Truncate Table `PP Coffee Shot`;
Truncate Table `PP Vanilla`;
Truncate Table `PP Choco`;
Truncate Table `RGB Ruby Badam`;
Truncate Table `RGB Ruby Rose`;
Truncate Table `RGB Milky Badam`;
Truncate Table `RGB Choco`;
Truncate Table `PET Mango 600`;
Truncate Table `PET Mango 250`;
Truncate Table `PET Mango 200`;
Truncate Table `PET Zappy 250`;
