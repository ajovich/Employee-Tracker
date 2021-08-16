DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE departments (
    id INT(28) NOT NULL AUTO_INCREMENT,
    departmentName VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT(28) NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2), 
    departmentId INT(28) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY fk_department (departmentId) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT(28) NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    roleId INT(28), 
    managerId INT NULL, 
    PRIMARY KEY (id),
    FOREIGN KEY fk_role (roleId) REFERENCES role(id),
    FOREIGN KEY fk_manager (managerId) REFERENCES employee(id)
);