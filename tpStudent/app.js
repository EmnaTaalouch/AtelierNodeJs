const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const studentRoute = require('./routes/student');
const dbConfig = require('./mongoConfig/mongodb.json');
const mongoose = require('mongoose');

const app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/student', studentRoute);

app.use((req, res, next)=> {
    next(createError(404));
});


mongoose.connect(dbConfig.mongo.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = app;
