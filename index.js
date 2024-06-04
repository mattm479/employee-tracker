require('dotenv').config();

const CLI = require('./lib/cli.js');
const cli = new CLI();

cli.run().then();
