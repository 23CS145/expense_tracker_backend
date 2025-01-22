const fs = require('fs');

exports.create = (fileName) => {
    fs.writeFile(fileName, JSON.stringify([], null, 2), (err) => {
        if (err) {
            console.log("Error creating file:", err);
        } else {
            console.log("Student file created successfully");
        }
    });
};


exports.add = (fileName, student) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.log("Error reading file:", err);
            return;
        }
        let students = JSON.parse(data);
        students.push(student);

        fs.writeFile(fileName, JSON.stringify(students, null, 2), (err) => {
            if (err) {
                console.log("Error writing to file:", err);
            } else {
                console.log("Student added successfully");
            }
        });
    });
};



exports.update = (fileName, studentName, updatedData) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.log("Error reading file:", err);
            return;
        }
        let students = JSON.parse(data);
        let index = students.findIndex(student => student.name === studentName);

        if (index !== -1) {
            students[index] = { ...students[index], ...updatedData };
            fs.writeFile(fileName, JSON.stringify(students, null, 2), (err) => {
                if (err) {
                    console.log("Error writing to file:", err);
                } else {
                    console.log("Student updated successfully");
                }
            });
        } else {
            console.log("Student not found");
        }
    });
};


exports.delete = (fileName, studentName) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.log("Error reading file:", err);
            return;
        }
        let students = JSON.parse(data);
        let filteredStudents = students.filter(student => student.name !== studentName);

        fs.writeFile(fileName, JSON.stringify(filteredStudents, null, 2), (err) => {
            if (err) {
                console.log("Error writing to file:", err);
            } else {
                console.log("Student deleted successfully");
            }
        });
    });
};
