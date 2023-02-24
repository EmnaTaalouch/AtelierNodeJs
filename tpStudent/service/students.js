const Student = require('../models/student');

async function saveStudent({name, age}) {
  const existingStudent = await Student.findOne({ name });

  if (existingStudent) {
    throw new Error('Student already exists');
  }

  const newStudent = new Student({ name, age });
  await newStudent.save();

  return newStudent;
}

async function findStudentByName(name) {
  const student = await Student.findOne({ name });

  if (!student) {
    throw new Error('Student not found');
  }

  return student;
}

async function findStudentsOver18() {
    const students = await Student.find({ age: { $gt: 18 } });
    return students;
  }

module.exports = {
  saveStudent,
  findStudentByName,
  findStudentsOver18,
};
