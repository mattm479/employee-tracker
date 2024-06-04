const { Client } = require('pg');

class Database {
    #dbConnection;

    /** Create DB Client and connect to database */
    constructor() {
        this.#dbConnection = new Client(process.env.PG_CONNECTION_STRING);
        this.#dbConnection.connect();
    }

    /** Query the database and return the results */
    async query(sql, params = []) {
        return await this.#dbConnection.query(sql, params);
    }
}

module.exports = Database;
