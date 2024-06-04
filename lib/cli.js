const Options = require('./options');
const inquirer= require('inquirer');

class CLI {
    #options = new Options(inquirer);

    run = async () => {
        try {
            let quit;
            const answer = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'option',
                    message: 'Please select an option:',
                    choices: [
                        this.#options.VIEW_ALL_DEPARTMENTS,
                        this.#options.VIEW_ALL_ROLES,
                        this.#options.VIEW_ALL_EMPLOYEES,
                        this.#options.VIEW_EMPLOYEES_BY_MANAGER,
                        this.#options.VIEW_EMPLOYEES_BY_DEPARTMENT,
                        this.#options.VIEW_COMBINED_SALARIES_BY_DEPARTMENT,
                        this.#options.ADD_DEPARTMENT,
                        this.#options.ADD_ROLE,
                        this.#options.ADD_EMPLOYEE,
                        this.#options.UPDATE_EMPLOYEE_MANAGER,
                        this.#options.UPDATE_EMPLOYEE_ROLE,
                        this.#options.QUIT
                    ]
                }
            ]);
            quit = await this.#options.mappings[answer.option]();
            if (quit === true) process.exit(0);

            await this.run();
        } catch(err) {
            console.error(err);
        }
    };
}

module.exports = CLI;
