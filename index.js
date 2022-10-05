const express = require("express");
const app = express();
const router = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(3000, (error) => {
  error ? console.log(error) : console.log("Server Running");
});
