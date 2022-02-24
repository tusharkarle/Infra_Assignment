const async = require("hbs/lib/async");
const jwt = require("jsonwebtoken");

const createToken = async () => {
    
	const token = await jwt.sign(
		{ _id: "620d39fc6d93413c78d7709e" },
        "mynameistusharkarleiamgoodboyiliveinchas", {expiresIn:"2 seconds"}
	);

	console.log(token);

	//user verification
	const userVerify = await jwt.verify(
		token,
		"mynameistusharkarleiamgoodboyiliveinchas"
	);
	console.log(userVerify);
};

createToken();
