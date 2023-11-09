const express = require('express');
const https = require('https');
const fs = require('fs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const APIRoutes = require('./routes/APIRoutes');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended:true }))
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.render('index', {title: "Home"});
});

app.get('/swagger', (req, res) => {
    res.render('swagger');
});

// vin.farted.net:3000/API/test
// localhost:3000/API/test
app.use('/API', APIRoutes);

app.use((req, res) => {
    res.status(404).render('404', {title: "Error 404"});
});

const sslServer = https.createServer(
    {
        key: fs.readFileSync('./cert/key.pem'),
        cert: fs.readFileSync('./cert/cert.pem')
    },
    app
);

mongoose.connect('mongodb://127.0.0.1:27017/printer', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to DB');
        sslServer.listen(3000, () => console.log("ssl server has started"));
        // app.listen(3000, () => console.log("server has started"));
    })
    .catch((err) => console.log(err));
