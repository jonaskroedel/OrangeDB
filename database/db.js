require('dotenv').config({path: '../.env'});
const mysql = require('mysql2/promise');

module.exports = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});