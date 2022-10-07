const { Pool } = require("pg");
const connect = new Pool({
  host: "babar.db.elephantsql.com",
  user: "ehgcqzkm",
  password: "5HpB910slyGHAhQHa7xnaWFHlOPGbUWd",
  database: "ehgcqzkm",
  port: "5430",
});

// const connect = new Pool({
//   host: "localhost",
//   user: "postgres",
//   password: "1234",
//   database: "postgres",
//   port: "5430",
// });

module.exports = connect;
