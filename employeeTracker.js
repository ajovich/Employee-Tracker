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

// Connect to MySQL sever & SQL db
connection.connect((err) => {
    if (err) throw err;
    // Runs the runSearch function after connection is made to prompt user for action
    runSearch();
});

//////////////////////// PROMPT USER FUNCTIONS  ////////////////////////

// Function which prompts the user what action they would like to take
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
            'View all employees by department',
            'View all employees by role',
            'View all employees',
            'Update employee role',
            'Exit application'
        ],
      })
      // Switch statements depending on action user wants to take & corresponding function
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

            case 'View all employees by department':
                viewDepartments();
                break;

            case 'View all employees by role':
                viewRoles();
                break;

            case 'View all employees':
                viewEmployees();
                break;

            case 'Update employees by role':
                updateEmployeeRole();
                break;

            case 'Exit application':
                connection.end();
                break;
        }
    });
};

//////////////////////// ADD DEPARTMENT, ROLES, & EMPLOYEES ////////////////////////

// Function for user to input department name 
const addDepartment = () => {
    inquirer
      .prompt({
          name: 'departments',
          type: 'input',
          message: 'Input department name: ',
      })
      .then((answer) => {
          // When finished prompting, department name added to db
          connection.query(
            "INSERT INTO departments SET ?",
            {
                name: answer.departments,
            },
            (err) => {
                if (err) throw err;
                console.log("Department successfully added!");
                // Re-prompt the user for next action
                runSearch();
            }
        );
    });
};

// Function for user to input role data 
const addRole = () => {
    inquirer
      .prompt([
        {
          name: 'role',
          type: 'input',
          message: 'Input role: ',
        },
       {
          name: 'salary',
          type: 'input',
          message: 'Input salary: '
       },
       {
        name: 'departmentId',
        type: 'input',
        message: 'Input department ID: '
       },
    ])
      .then((answer) => {
        // When finished prompting, inserts role data into db
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.role,
            salary: answer.salary,
            department_id: answer.departmentId,
          },
          (err) => {
              if (err) throw err;
              console.log("Role successfully added!");
              // Re-prompt the user for next action
              runSearch();
          }
        );
    });
};

// Function for user to input employee data
const addEmployee = () => {
    inquirer
      .prompt([
        {
          name: 'firstName',
          type: 'input',
          message: 'Input employee\'s first name: ',
        },
       {
          name: 'lastName',
          type: 'input',
          message: 'Input employee\'s last name: '
       },
       {
        name: 'roleId',
        type: 'input',
        message: 'Input employee\'s role ID: '
       },
    ])
    .then((answer) => {
        // When finished prompting, inserts employee data into db
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.roleId,
          },
          (err) => {
              if (err) throw err;
              console.log("Employee successfully added!");
              // Re-prompt the user for next action
              runSearch();
          }
        );
    });
};

/// https://www.mysqltutorial.org/mysql-join/ ///
//////////////////////// VIEW DEPARTMENT, ROLES, & EMPLOYEES ////////////////////////

function viewEmployees() {
    // connection.query("SELECT employee.first_name, employee.last_name, role.title, department.department_name, CONCAT (e.first_name, ' ', e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee e ON employee.manager_id = e.id ORDER BY last_name ASC),

    // connection.query(query, (err, res) => {
    //     if (err) throw err;
    //     connection.end;
    // });
    // runSearch()
};

function viewDepartments() {

};

function viewRoles() {

};


//////////////////////// UPDATE DEPARTMENT, ROLES, & EMPLOYEES ////////////////////////

function updateEmployeeRole() {

};