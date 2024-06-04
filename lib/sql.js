class Sql {
    static GET_ALL_EMPLOYEES = "SELECT e.id, e.first_name || ' ' || e.last_name AS name, r.salary, r.title, d.name AS department, e2.first_name || ' ' || e2.last_name AS manager FROM employee e INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id LEFT JOIN employee e2 ON e.manager_id = e2.id ORDER BY e.id";
    static GET_ALL_DEPARTMENTS = 'SELECT id, name FROM department ORDER BY id';
    static GET_ALL_ROLES = 'SELECT r.id, r.title, r.salary, d.name FROM role r INNER JOIN department d ON r.department_id = d.id ORDER BY r.id';
    static GET_EMPLOYEE_BY_NAME = 'SELECT id FROM employee WHERE first_name = $1 AND last_name = $2';
    static GET_EMPLOYEES_BY_MANAGER = "SELECT e.id, e.first_name || ' ' || e.last_name AS name, r.salary, r.title, e2.first_name || ' ' || e2.last_name AS manager FROM employee e INNER JOIN role r ON e.role_id = r.id INNER JOIN employee e2 ON e.manager_id = e2.id WHERE e.manager_id = $1 ORDER BY e.id";
    static GET_EMPLOYEES_BY_DEPARTMENT = "SELECT e.id, e.first_name || ' ' || e.last_name AS employee_name, r.salary, r.title, d.name, e2.first_name || ' ' || e2.last_name AS manager FROM employee e INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id LEFT JOIN employee e2 on e.manager_id = e2.id WHERE d.name = $1 ORDER BY e.id";
    static GET_COMBINED_SALARY_BY_DEPARTMENT = 'SELECT d.name, SUM(r.salary) FROM department d INNER JOIN role r ON r.department_id = d.id INNER JOIN employee e ON e.role_id = r.id GROUP BY d.name ORDER BY d.name';
    static GET_DEPARTMENT_BY_NAME = 'SELECT id FROM department WHERE name = $1';
    static GET_ROLE_BY_NAME = 'SELECT id FROM role WHERE title = $1';
    static GET_ALL_MANAGERS = 'SELECT DISTINCT e2.first_name, e2.last_name FROM employee e INNER JOIN employee e2 ON e.manager_id = e2.id';
    static ADD_DEPARTMENT = 'INSERT INTO department (name) VALUES ($1)';
    static ADD_ROLE = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';
    static ADD_EMPLOYEE = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
    static UPDATE_EMPLOYEE_ROLE = 'UPDATE employee SET role_id = $1 WHERE id = $2';
    static UPDATE_EMPLOYEE_MANAGER = 'UPDATE employee SET manager_id = $1 WHERE id = $2';
}

module.exports = Sql;
