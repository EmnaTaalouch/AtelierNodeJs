const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const contactRoute = require('./routes/contact')
const dbConfig = require('./mongoConfig/mongoDB.json')
const mongoose = require('mongoose')

const app = express();

app.use(logger('dev'));


app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/contact', contactRoute)


app.use((req, res, next)=> {
    next(createError(404))
})

mongoose.connect(dbConfig.mongo.uri)

module.exports = app;