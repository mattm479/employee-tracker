const EmployeeTrackerService = require('./employee-tracker.service');
const Table = require('cli-table');

class Options {
    VIEW_ALL_DEPARTMENTS = 'View all Departments';
    VIEW_ALL_ROLES = 'View all Roles';
    VIEW_ALL_EMPLOYEES = 'View all Employees';
    VIEW_EMPLOYEES_BY_MANAGER = 'View Employees by Manager';
    VIEW_EMPLOYEES_BY_DEPARTMENT = 'View Employees by Department';
    VIEW_COMBINED_SALARIES_BY_DEPARTMENT = 'View Combined Salaries by Department';
    ADD_DEPARTMENT = 'Add Department';
    ADD_ROLE = 'Add Role';
    ADD_EMPLOYEE = 'Add Employee';
    UPDATE_EMPLOYEE_ROLE = 'Update Employee Role';
    UPDATE_EMPLOYEE_MANAGER = 'Update Employee Manager';
    QUIT = 'Quit';

    #employeeTrackerService = new EmployeeTrackerService();
    #formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    #inquirer;

    constructor(inquirer) {
        this.#inquirer = inquirer;
    }

    mappings = {
        [this.VIEW_ALL_DEPARTMENTS]: async () => {
            const departments = await this.#employeeTrackerService.viewDepartments();
            const table = new Table({ head: ['Id', 'Name'] });

            table.push(...departments.rows.map(department => [department.id, department.name]));

            console.log(table.toString());

            return false;
        },
        [this.VIEW_ALL_ROLES]: async () => {
            const roles = await this.#employeeTrackerService.viewRoles();
            const table = new Table({ head: ['Id', 'Title', 'Salary', 'Department']});

            table.push(...roles.rows.map(role => [role.id, role.title, this.#formatter.format(role.salary), role.name]));

            console.log(table.toString());

            return false;
        },
        [this.VIEW_ALL_EMPLOYEES]: async () => {
            const employees = await this.#employeeTrackerService.viewEmployees();
            const table = new Table({ head: ['Id', 'Name', 'Salary', 'Role', 'Department', 'Manager']});

            table.push(...employees.rows.map(employee => [employee.id, employee.name, this.#formatter.format(employee.salary), employee.title, employee.department, (employee.manager === null) ? '' : employee.manager]));

            console.log(table.toString());

            return false;
        },
        [this.VIEW_EMPLOYEES_BY_MANAGER]: async () => {
            const managerNames = await this.#getManagers();
            const answer = await this.#inquirer.prompt(
                {
                    name: 'manager',
                    type: 'list',
                    message: 'Select the Manager\'s name:',
                    choices: managerNames
                }
            );
            const data = await this.#employeeTrackerService.viewEmployeesByManager(answer.manager);
            const table = new Table({ head: ['Id', 'Name', 'Salary', 'Role', 'Manager']});

            table.push(...data.rows.map(row => [row.id, row.name, this.#formatter.format(row.salary), row.title, row.manager]));

            console.log(table.toString());

            return false;
        },
        [this.VIEW_EMPLOYEES_BY_DEPARTMENT]: async () => {
            const departmentNames = await this.#getDepartments();
            const answer = await this.#inquirer.prompt(
                {
                    name: 'department',
                    type: 'list',
                    message: 'Select the Department name:',
                    choices: departmentNames
                }
            );
            const data = await this.#employeeTrackerService.viewEmployeesByDepartment(answer.department);
            const table = new Table({ head: ['Id', 'Name', 'Salary', 'Role', 'Department', 'Manager']});

            table.push(...data.rows.map(row => [row.id, row.employee_name, this.#formatter.format(row.salary), row.title, row.name, (row.manager === null) ? '' : row.manager]));

            console.log(table.toString());

            return false;
        },
        [this.VIEW_COMBINED_SALARIES_BY_DEPARTMENT]: async () => {
            const data = await this.#employeeTrackerService.viewCombinedSalaryByDepartment();
            const table = new Table({ head: ['Department', 'Combined Salary']})

            table.push(...data.rows.map(row => [row.name, this.#formatter.format(row.sum)]));

            console.log(table.toString());

            return false;
        },
        [this.ADD_DEPARTMENT]: async () => {
            const answer = await this.#inquirer.prompt(
                {
                    name: 'name',
                    type: 'input',
                    message: 'Enter the Department name'
                }
            );

            await this.#employeeTrackerService.addDepartment(answer.name);
            console.log(`Department with name ${answer.name} was added successfully`);

            return false;
        },
        [this.ADD_ROLE]: async () => {
            const departments = await this.#getDepartments();
            const answer = await this.#inquirer.prompt([
                {
                    name: 'name',
                    type: 'input',
                    message: 'Enter the Role name'
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'Enter the Role salary'
                },
                {
                    name: 'department',
                    type: 'list',
                    message: 'Select the Department for the Role',
                    choices: departments
                }
            ]);

            await this.#employeeTrackerService.addRole(answer.name, answer.salary, answer.department);
            console.log(`Role with name ${answer.name} was added successfully`);

            return false;
        },
        [this.ADD_EMPLOYEE]: async () => {
            const roles = await this.#getRoles();
            const managers = await this.#getManagers();
            const answer = await this.#inquirer.prompt([
                {
                    name: 'firstName',
                    type: 'input',
                    message: 'Enter the Employees first name'
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: 'Enter the Employees last name'
                },
                {
                    name: 'role',
                    type: 'list',
                    message: 'Select the Employees role',
                    choices: roles
                },
                {
                    name: 'manager',
                    type: 'list',
                    message: 'Select the Employees manager',
                    choices: managers
                }
            ]);

            await this.#employeeTrackerService.addEmployee(answer.firstName, answer.lastName, answer.role, answer.manager);
            console.log(`Employee with name ${answer.firstName} ${answer.lastName} was added successfully`);

            return false;
        },
        [this.UPDATE_EMPLOYEE_ROLE]: async () => {
            const employees = await this.#getEmployees();
            const roles = await this.#getRoles();
            const answer = await this.#inquirer.prompt([
                {
                    name: 'employee',
                    type: 'list',
                    message: 'Select the Employee to update',
                    choices: employees
                },
                {
                    name: 'role',
                    type: 'list',
                    message: 'Select the Employees new role',
                    choices: roles
                }
            ]);

            await this.#employeeTrackerService.updateEmployee(answer.employee, answer.role);
            console.log(`Employee ${answer.employee} was updated successfully`);

            return false;
        },
        [this.UPDATE_EMPLOYEE_MANAGER]: async () => {
            const employees = await this.#getEmployees();
            const managers = await this.#getManagers();
            const answer = await this.#inquirer.prompt([
                {
                    name: 'employee',
                    type: 'list',
                    message: 'Select the Employee to update',
                    choices: employees
                },
                {
                    name: 'manager',
                    type: 'list',
                    message: 'Select the Employees new manager',
                    choices: managers
                }
            ]);

            await this.#employeeTrackerService.updateEmployeeManager(answer.employee, answer.manager);
            console.log(`Employee ${answer.employee} was updated successfully`);

            return false;
        },
        [this.QUIT]: async () => true
    };

    async #getManagers() {
        const managers = await this.#employeeTrackerService.viewManagers();
        const names = [ 'None' ];

        managers.rows.forEach(manager => {
            names.push(manager.first_name + ' ' + manager.last_name);
        });

        return names;
    }

    async #getDepartments() {
        const departments = await this.#employeeTrackerService.viewDepartments();
        const names = [];

        for (const department of departments.rows) {
            names.push(department.name);
        }

        return names;
    }

    async #getRoles() {
        const roles = await this.#employeeTrackerService.viewRoles();
        const names = [];

        roles.rows.forEach(role => {
            names.push(role.title);
        });

        return names;
    }

    async #getEmployees() {
        const employees = await this.#employeeTrackerService.viewEmployees();
        const names = [];

        employees.rows.forEach((employee) => {
            names.push(employee.name);
        });

        return names;
    }
}

module.exports = Options;
