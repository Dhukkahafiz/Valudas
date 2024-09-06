const mysql = require("mysql");

const connectDB = mysql.createConnection({
<<<<<<< HEAD
  host: "localhost",
  user: "root",
  password: "",
  database: "valudas_tech_park",
=======
  host: process.env.HOSTING_PORT,
  user: process.env.SERVER_OWNER,
  password: process.env.SERVER_PASSWORD,
  database: process.env.DATABASE_IDENTITY,
>>>>>>> 7f0bd4d54ae5eacb9abb139c7f27365c3f6c7442
});

module.exports = connectDB;

