const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Student = new Schema({
    name: String,
    age: Number
})

module.exports = mongoose.model('students', Student)

