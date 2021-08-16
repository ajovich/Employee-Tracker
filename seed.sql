/* Pre-populate employeeTracker_db */

/* Department seeds */
INSERT INTO departments (id, department_name)
VALUES (1, 'Engineering');

INSERT INTO departments (id, department_name)
VALUES (2, 'Design');

INSERT INTO departments (id, department_name)
VALUES (3, 'Security');

/* Role seeds */
INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Software Engineer', 175000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, 'Front-End Engineer', 150000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, 'UX/UI Designer', 100000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, 'Network Security', 90000, 3);

/* Employee seeds */
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Cloud', 'Strife', 1, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, 'Tifa', 'Lockhart', 3, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, 'Vincent', 'Valentine', 4, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, 'Aerith', 'Gainsborough', 3, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, 'Yuffie', 'Kisaragi', 2, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, 'Squall', 'Leonhart', 4, 1);
