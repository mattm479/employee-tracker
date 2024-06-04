# Employee Tracker
  
  [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## Description
  The Employee Tracker allows the user to View Departments, Roles and Employees. They are also able to View Employees by Manager or Department. The User is also able to Add Departments, Roles and Employees as well as update an Employees' Role and/or Manager. There is also a report that shows the Combined Salary of all Employees per Department.
  
  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Questions](#questions)
  
  ## Installation
  TO install this project, you need to clone the source code from https://github.com/mattm479/employee-tracker. From there you will need to run `npm i` from the project root. You will also need to rename `.env.EXAMPLE` to just `.env` and add the connection string to your PostgreSQL database. After that, you will need to connect to the PostgreSQL database and run the `schema.sql` file in the `db` folder as well as the `department.sql`, `employee.sql` and `role.sql` files in the `seeds` folder. They will need to be run in the following sequence: `department.sql`, `role.sql` and then `employee.sql`.
  
  ## Usage
  To use this project, open a Terminal pointed at the project root and run `node index` then follow the prompts.
  
  ## License
  This repository uses the [MIT](https://opensource.org/licenses/MIT) license.
  
  ## Questions
  If you have any questions, you can find me on GitHub at [mattm479](https://github.com/mattm479) or you can email me at [mattm479@gmail.com](mailto:mattm479@gmail.com).
