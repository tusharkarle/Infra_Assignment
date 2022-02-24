require("dotenv").config();
// console.log(process.env.SECRET_KEY);
const exp = require("constants");
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const res = require("express/lib/response");

require("./db/connection.js");
const Register = require("../src/models/registers.js");
const async = require("hbs/lib/async");
const { truncateSync } = require("fs");
const port = process.env.PORT || 8000;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/*  to use static html
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath)); */

const templatePath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");

app.set("views", templatePath);
hbs.registerPartials(partialPath);

//use it as req body gives data in json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/register", (req, res) => {
	res.render("register");
});

//create a new user in the database
app.post("/register", async (req, res) => {
	try {
		const givenPassword = req.body.password;
		const givenConfirmPassword = req.body.confirmPassword;

		if (givenConfirmPassword === givenPassword) {
			const registerEmployee = new Register({
				firstname: req.body.firstName,
				lastname: req.body.lastName,
				email: req.body.email,
				phone: req.body.phone,
				password: req.body.password,
				confirmPassword: req.body.confirmPassword,
			});

			const token = await registerEmployee.generateAuthToken();
			console.log(token);

			const register = await registerEmployee.save();
			console.log("user created successfully");

			res.status(201).render("index");
		} else {
			res.send("passwords are not matching");
		}
	} catch (error) {
		res.status(400).send(error);
		console.log(error);
	}
});

app.get("/login", (req, res) => {
	res.render("login");
});

app.post("/login", async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;

		const useremail = await Register.findOne({ email: email });

		const isMatch = await bcrypt.compare(password, useremail.password);
		//check the token
		const token = await useremail.generateAuthToken();
		console.log(token);

		if (isMatch) {
			console.log("login successfull");
			res.render("index");
		} else {
			console.log("password not matching");
		}
	} catch (error) {
		console.log(error);
	}
});

app.listen(port, () => {
	console.log(`Server is running at port ${port}`);
});
