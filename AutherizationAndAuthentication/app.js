const express = require("express");
const morgan = require("morgan");
const CreateError = require("http-errors");
const res = require("express/lib/response");
const createError = require("http-errors");
require("dotenv").config();
require("./Connection/init_mongo_db.js");

const app = express();
app.use(morgan("dev"));
//VARIABLES
const port = process.env.PORT;

// CREATE ROUTERS
const router = require("./routes/Auth.route.js");
app.use("/auth", router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { verifyAccessToken } = require("./jwthelper/jwthelper.js");

app.get("/",verifyAccessToken ,async (req, res) => {
    try {
        // console.log(req.headers['authorization']);
		res.send("hello from express");
	} catch (error) {
		res.status(400).send(error);
	}
});

app.use(async (req, res, next) => {
	const err = createError.NotFound("this route doesnot exist");
	res.status(err.status || 500);
	res.send({
		error: {
			status: err.status || 500,
			message: err.message,
		},
	});
});

app.listen(port, () => {
	console.log(`listing to port ${port}`);
});
