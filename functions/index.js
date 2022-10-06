const express = require("express");
const app = express();
const router = require("../routes");
const serverless = require("serverless-http");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({}));
app.use(router);

app.listen(3000, (error) => {
  error ? console.log(error) : console.log("Server Running");
});

module.exports.handler = serverless(app);
