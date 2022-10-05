const { Pool } = require("pg");
const connect = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "ecommers",
  port: "5430",
});

module.exports = connect;
