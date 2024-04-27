const express = require('express');
const https = require('https');
const fs = require('fs');
const APIRoutes = require('./routes/APIRoutes');
const logRoutes = require('./routes/logRoutes');
const { attachSqlConnection } = require('./middlewares/sqlConnection');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

app.use(attachSqlConnection);
app.use(logRoutes);

app.get('/', (req, res) => {
    res.render('index', { title: "Home" });
});

app.get('/swagger', (req, res) => {
    res.render('swagger');
});

app.use('/API', APIRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: "Error 404" });
});

const port = 3000;
// app.listen(port);

const sslServer = https.createServer(
    {
        key: fs.readFileSync('./cert/key.pem'),
        cert: fs.readFileSync('./cert/cert.pem')
    },
    app
);

sslServer.listen(port, () => console.log(`ssl server has started at ${getDateString()}`));

function getDateString() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
}