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

// Function to hold an empty array for all employees until user updates employee role
const employee = () => {
    const employee = [];
};

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

// Add department
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

// Add role
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

// Add employee
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

/// https://www.mysqltutorial.org/mysql-join/, https://www.w3schools.com/sql/sql_join.asp, Bootcamp week 12 activity 14 ////

// View employees
function viewEmployees() {
    let query = 
        `SELECT employee.firstName, employee.lastName, role.role, role.salary, role.departmentId`;
    query += 
        `FROM employee`;
    query += 
        `INNER JOIN role ON employee.roleId = employee.roleId INNER JOIN departments ON role.departmentId = role.departmentId`;
    query += 
        `ORDER BY lastName ASC`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(res);
    })
    runSearch();
};

// View departments
function viewDepartments() {
    let query = 
        `SELECT * FROM departments`;
    query += 
        `ORDER BY departments ASC`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(res);
    })
    runSearch();
};

// View roles
function viewRoles() {
    let query = 
        `SELECT * FROM role`;
    query += 
        `INNER JOIN departments ON role.departmentId = departmentId`;
    query += 
        `ORDER BY role ASC`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(res);
    })
    runSearch();
};

// Update employee role
const updateRole = () => {
    inquirer
      .prompt([
        {
            name: 'role',
            type: 'input',
            message: 'Select the employee you would like to update',
            choices: employee()
          },
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
        // When finished prompting, inserts updated role data into db
        connection.query(
          "INSERT INTO role SET ?",
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            title: answer.role,
            salary: answer.salary,
            department_id: answer.departmentId,
          },
          (err) => {
              if (err) throw err;
              console.log("Employee role successfully updated!");
              // Re-prompt the user for next action
              runSearch();
          }
        );
    });
};