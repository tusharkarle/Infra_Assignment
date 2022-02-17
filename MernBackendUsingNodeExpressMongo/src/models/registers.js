const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required:true
    },
    lastname: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    phone: {
        type: Number,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    confirmPassword: {
        type: String,
        required:true
    },

});

// create a collection
const Register = new mongoose.model("registeruser", employeeSchema);


module.exports = Register;