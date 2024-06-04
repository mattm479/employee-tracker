const Sql = require('./sql');
const Database = require('./database');

class EmployeeTrackerService {
    #database = new Database();

    async viewDepartments() {
        return await this.#database.query(Sql.GET_ALL_DEPARTMENTS);
    }

    async viewRoles() {
        return await this.#database.query(Sql.GET_ALL_ROLES);
    }

    async viewEmployees() {
        return await this.#database.query(Sql.GET_ALL_EMPLOYEES);
    }

    async viewManagers() {
        return await this.#database.query(Sql.GET_ALL_MANAGERS);
    }

    async viewEmployeesByManager(manager) {
        const name = manager.split(' ');
        const manager_id = await this.#database.query(Sql.GET_EMPLOYEE_BY_NAME, [name[0], name[1]]); // first_name last_name

        return await this.#database.query(Sql.GET_EMPLOYEES_BY_MANAGER, [manager_id.rows[0].id]);
    }

    async viewEmployeesByDepartment(department) {
        return await this.#database.query(Sql.GET_EMPLOYEES_BY_DEPARTMENT, [department]);
    }

    async viewCombinedSalaryByDepartment(department) {
        return await this.#database.query(Sql.GET_COMBINED_SALARY_BY_DEPARTMENT);
    }

    async addDepartment(name) {
        return await this.#database.query(Sql.ADD_DEPARTMENT, [name]);
    }

    async addRole(name, salary, department) {
        const department_id = await this.#database.query(Sql.GET_DEPARTMENT_BY_NAME, [department]);
        return await this.#database.query(Sql.ADD_ROLE, [name, salary, department_id.rows[0].id]);
    }

    async addEmployee(firstName, lastName, role, manager) {
        const role_id = await this.#database.query(Sql.GET_ROLE_BY_NAME, [role]);
        if (manager !== 'None') {
            const manager_name = manager.split(' ');
            const manager_id = await this.#database.query(Sql.GET_EMPLOYEE_BY_NAME, [manager_name[0], manager_name[1]]);

            return await this.#database.query(Sql.ADD_EMPLOYEE, [firstName, lastName, role_id.rows[0].id, manager_id.rows[0].id]);
        }

        return await this.#database.query(Sql.ADD_EMPLOYEE, [firstName, lastName, role_id.rows[0].id, null]);
    }

    async updateEmployee(employee, role) {
        const role_id = await this.#database.query(Sql.GET_ROLE_BY_NAME, [role]);
        const employee_name = employee.split(' ');
        const employee_id = await this.#database.query(Sql.GET_EMPLOYEE_BY_NAME, [employee_name[0], employee_name[1]]);

        return await this.#database.query(Sql.UPDATE_EMPLOYEE_ROLE, [role_id.rows[0].id, employee_id.rows[0].id]);
    }

    async updateEmployeeManager(employee, manager) {
        const manager_name = manager.split(' ');
        const manager_id = await this.#database.query(Sql.GET_EMPLOYEE_BY_NAME, [manager_name[0], manager_name[1]]);
        const employee_name = employee.split(' ');
        const employee_id = await this.#database.query(Sql.GET_EMPLOYEE_BY_NAME, [employee_name[0], employee_name[1]]);

        return await this.#database.query(Sql.UPDATE_EMPLOYEE_MANAGER, [manager_id.rows[0].id, employee_id.rows[0].id]);
    }
}

module.exports = EmployeeTrackerService;