DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE departments (
    id INT(28) NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
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

-- HOW TO JOIN TABLES
-- use employeeTracker_db;
-- SELECT employee.*, 
-- 	employeeManager.first_name as manager_first, 
-- 	employeeManager.last_name as manager_last 
--     `role`.title,
--     `role`.salary,
--     department.name,
-- FROM employee
-- INNER JOIN employee employeeManager ON employee.manager_id = employeeManager.id;
-- INNER JOIN `role` ON employee.role_id = role.id;
-- INNER JOIN department ON `role`.department_id = department.id