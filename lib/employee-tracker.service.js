const Sql = require('./sql');
const Database = require('./database');

class EmployeeTrackerService {
    #database = new Database();

    /** Get all departments */
    async viewDepartments() {
        return await this.#database.query(Sql.GET_ALL_DEPARTMENTS);
    }

    /** Get all roles */
    async viewRoles() {
        return await this.#database.query(Sql.GET_ALL_ROLES);
    }

    /** Get all employees */
    async viewEmployees() {
        return await this.#database.query(Sql.GET_ALL_EMPLOYEES);
    }

    /** Get all managers */
    async viewManagers() {
        return await this.#database.query(Sql.GET_ALL_MANAGERS);
    }

    /** Get all employees by manager */
    async viewEmployeesByManager(manager) {
        const name = manager.split(' ');
        const manager_id = await this.#database.query(Sql.GET_EMPLOYEE_BY_NAME, [name[0], name[1]]); // first_name last_name

        return await this.#database.query(Sql.GET_EMPLOYEES_BY_MANAGER, [manager_id.rows[0].id]);
    }

    /** Get all employees by department */
    async viewEmployeesByDepartment(department) {
        return await this.#database.query(Sql.GET_EMPLOYEES_BY_DEPARTMENT, [department]);
    }

    /** Get combined salaries for all employees by department */
    async viewCombinedSalaryByDepartment(department) {
        return await this.#database.query(Sql.GET_COMBINED_SALARY_BY_DEPARTMENT);
    }

    /** Create a new department */
    async addDepartment(name) {
        return await this.#database.query(Sql.ADD_DEPARTMENT, [name]);
    }

    /** Create a new role */
    async addRole(name, salary, department) {
        const department_id = await this.#database.query(Sql.GET_DEPARTMENT_BY_NAME, [department]);
        return await this.#database.query(Sql.ADD_ROLE, [name, salary, department_id.rows[0].id]);
    }

    /** Create a new employee */
    async addEmployee(firstName, lastName, role, manager) {
        const role_id = await this.#database.query(Sql.GET_ROLE_BY_NAME, [role]);
        if (manager !== 'None') {
            const manager_name = manager.split(' ');
            const manager_id = await this.#database.query(Sql.GET_EMPLOYEE_BY_NAME, [manager_name[0], manager_name[1]]);

            return await this.#database.query(Sql.ADD_EMPLOYEE, [firstName, lastName, role_id.rows[0].id, manager_id.rows[0].id]);
        }

        return await this.#database.query(Sql.ADD_EMPLOYEE, [firstName, lastName, role_id.rows[0].id, null]);
    }

    /** Update employee's role */
    async updateEmployee(employee, role) {
        const role_id = await this.#database.query(Sql.GET_ROLE_BY_NAME, [role]);
        const employee_name = employee.split(' ');
        const employee_id = await this.#database.query(Sql.GET_EMPLOYEE_BY_NAME, [employee_name[0], employee_name[1]]);

        return await this.#database.query(Sql.UPDATE_EMPLOYEE_ROLE, [role_id.rows[0].id, employee_id.rows[0].id]);
    }

    /** Update employee's manager */
    async updateEmployeeManager(employee, manager) {
        const manager_name = manager.split(' ');
        const manager_id = await this.#database.query(Sql.GET_EMPLOYEE_BY_NAME, [manager_name[0], manager_name[1]]);
        const employee_name = employee.split(' ');
        const employee_id = await this.#database.query(Sql.GET_EMPLOYEE_BY_NAME, [employee_name[0], employee_name[1]]);

        return await this.#database.query(Sql.UPDATE_EMPLOYEE_MANAGER, [manager_id.rows[0].id, employee_id.rows[0].id]);
    }
}

module.exports = EmployeeTrackerService;