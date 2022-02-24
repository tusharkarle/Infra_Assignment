require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const async = require("hbs/lib/async");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }, ],
});
//generate token method
employeeSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({
                _id: this._id.toString()
            },
            process.env.SECRET_KEY
        );
        // console.log(token);
        // here this.tokens is used as we are inside the schema of we can add data ie token to json schema here only
        this.tokens = this.tokens.concat({
            token: token
        });
        //save the token in the schema and database
        await this.save();
        return token;
    } catch (error) {
        res.send(`the error part is ${error}`);
        console.log(`the error part is ${error}`);
    }
};

// pre method is called before the function argument fn given here it is save function
employeeSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        // this takes the password in the post method ie in the schema not the variable in the post function
        // console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmPassword = this.password;
    }
    next();
});

// create a collection
const Register = new mongoose.model("registeruser", employeeSchema);

module.exports = Register;