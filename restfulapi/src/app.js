const express = require("express");
require("./db/conn");
require("./routers/student.js");

const Student = require("./models/students.js");

const port = process.env.port || 8000;
const app = express();
app.use(express.json());
  

const studentRouter = require("./routers/student.js");
// 3. we need to register our router
app.use(studentRouter);

// create new students
/* 
app.post("/students", (req, res) => {
    //create new user
    console.log(req.body);
    //get the data into user
    const user = new Student(req.body);
    //save the data in the database using method in which it is called ie post here
    user.save().then(() => { 
        res.status(201).send(user);
    }).catch((err) => {
        res.status(404).send(err);
    }); //as it is the async function we have to wait till it gets executed
    console.log("hello from the post create user api");

}); */

// async function for above functions
app.post("/students", async (req, res) => {
    
    try { 
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }
    catch (err) {
        res.status(400).send(err);
    }
});


//read the data ie registered students
app.get("/students", async (req, res) => {
    try {
        const studentsData = await Student.find();
        res.send(studentsData);
    } catch (err) {
        res.send(err);
    }
 });
//get the individual data 
app.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        if (!studentData.length) {
            return res.status(404).send();
        }
        else {
            res.send(studentData);
        }
    } catch (err) {
        res.status(440).send(err);
    }
});
//update the students by there ids

app.patch("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        //update the student by using the id given in the url and take the request body to update the 
        const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
            new:true
        });
        res.status(200).send(updateStudent);
    } catch (err) {
        res.status(404).send(err);
    }
 });



//delete the students by id
app.delete("/students/:id", async (req, res) => { 
    try {
        const _id = req.params.id;
        const delStudent = await Student.findByIdAndDelete(_id);
        if (!delStudent) {
            res.status(400).send("Record didnt found");
        }
        else {
            res.status(200).send(delStudent);
        }
        
    } catch (error) {
        res.status(440).send(error);
    }
});

app.listen(port, () => { 
    console.log(`connection is setup at port ${port}`);
});