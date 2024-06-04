const { Client } = require('pg');

class Database {
    #dbConnection;

    constructor() {
        this.#dbConnection = new Client(process.env.PG_CONNECTION_STRING);
        this.#dbConnection.connect();
    }

    async query(sql, params = []) {
        return await this.#dbConnection.query(sql, params);
    }
}

module.exports = Database;
