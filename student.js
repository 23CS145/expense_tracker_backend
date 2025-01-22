const studentOperations = require('./crud.js');

const fileName = 'student.json';

// studentOperations.create(fileName);

studentOperations.add(fileName, { name: "Shree", age: 20, dept: "CSE" });
studentOperations.add(fileName, { name: "Subha", age: 21, dept: "CSE" });
studentOperations.add(fileName, { name: "Visalani", age: 18, dept: "CSE" });

studentOperations.update(fileName, "Shree", { age: 21, dept: "IT" });

studentOperations.delete(fileName, "Shree");
