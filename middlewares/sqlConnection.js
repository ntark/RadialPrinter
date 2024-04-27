const mysql = require('mysql');

const pool = mysql.createPool({
    host: '172.17.0.1',
    port: '3306',
    user: 'printer',
    password: process.env.MYSQL_printer_PASS,
    database: 'printer'
});

const attachSqlConnection = (req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return next(err);
        }
        req.sqlConnection = connection;
        next();
    });
};

module.exports = { attachSqlConnection };
