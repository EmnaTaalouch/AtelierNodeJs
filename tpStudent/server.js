const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { saveStudent, findStudentByName, findStudentsOver18 } = require('./service/students');
const dbConfig = require('./mongoConfig/mongodb.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(dbConfig.mongo.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
app.post('/students', async (req, res) => {
  try {
    const student = await saveStudent(req.body);
    res.json(student);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/students/:name', async (req, res) => {
  try {
    const student = await findStudentByName(req.params.name);
    if (!student) {
      res.status(404).send(`Student with name ${req.params.name} not found`);
    } else {
      res.json(student);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/students', async (req, res) => {
  try {
    const students = await findStudentsOver18();
    res.json(students);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
