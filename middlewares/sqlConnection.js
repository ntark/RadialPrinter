const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
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
