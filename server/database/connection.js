const mysql = require("mysql");

const connectDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "valudas_tech_park",
});

module.exports = connectDB;
