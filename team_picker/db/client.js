const knex = require("knex");
const knexDevelopmentConfig = require("../knexfile").development;

module.exports = knex(knexDevelopmentConfig);