/**
 * Created by Igor on 14.07.2017.
 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db=require('./db');
const app = express();

const staticPath = path.join(__dirname, '/public');
app.use(express.static(staticPath));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const routes = require('./routes/router')(app);


db.connect('mongodb://localhost:27017/ajax', err => {
    if (err) {
        return console.log(err);
    }
    app.listen(3012, function () {
        console.log('API chat started !!!');
    })
});