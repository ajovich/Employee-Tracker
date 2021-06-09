// Require in all (3) dependencies
const mysql = require('mysql');
const consoleTable = require('console.table');
const inquirer = require('inquirer');

// Create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "BtS21*!c",
    database: "employeeTracker_db",
});

connection.connect((err) => {
    if (err) throw err;
    runSearch();
});

const runSearch = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
            'Add department',
            'Add role',
            'Add employee',
            'View all departments',
            'View all roles',
            'View all employees',
            'Update employee role',
            'Remove department',
            'Remove role',
            'Remove employee',
        ],
      })

      .then((answer) => {
          switch (answer.action) {
            case 'Add department':
                addDepartment();
                break;

            case 'Add role':
                addRole();
                break;

            case 'Add employee':
                addEmployee();
                break;

            case 'View all departments':
                viewDepartments();
                break;

            case 'View all roles':
                viewRoles();
                break;

            case 'View all employees':
                viewEmployees();
                break;

            case 'Update employee role':
                updateEmployeeRole();
                break;

            case 'Remove department':
                removeDepartment();
                break;

            case 'Remove role':
                removeRole();
                break;

            case 'Remove employee':
                removeEmployee();
                break; 
          }
      });
};