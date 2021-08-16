DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE departments (
    id INT(28) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT(28) NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2), 
    department_id INT(28) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY fk_department (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT(28) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT(28), 
    manager_id INT NULL, 
    PRIMARY KEY (id),
    FOREIGN KEY fk_role (role_id) REFERENCES role(id),
    FOREIGN KEY fk_manager (manager_id) REFERENCES employee(id)
);
