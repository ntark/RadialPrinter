const logger = (req, res, next) => {
    const logEntry = {
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        host: req.hostname,
        path: req.path,
        method: req.method,
    };
    console.log(logEntry);
    const sqlConnection = req.sqlConnection;
    const sql = 'INSERT INTO logs (ip, host, path, method) VALUES (?, ?, ?, ?)';
    const values = [logEntry.ip, logEntry.host, logEntry.path, logEntry.method];

    sqlConnection.query(sql, values, (error, results, fields) => {
        if (error) {
            return next(error);
        }
        sqlConnection.release();
        next();
    });

    return;
};

module.exports = {
    logger
};