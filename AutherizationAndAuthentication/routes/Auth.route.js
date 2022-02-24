const express = require("express");
const router = express.Router();
const user = require("../Models/User.model.js");
router.use(express.json());
const { signAccessToken, signRefreshToken ,verifyRefreshToken} = require("../jwthelper/jwthelper.js");
const createError = require("http-errors");
const { verify } = require("jsonwebtoken");

router.post("/register", async (req, res) => {
	try {
		const createUser = await user(req.body);
		const storeUser = await createUser.save();
        const accessToken = await signAccessToken(storeUser.id);
        const refreshToken = await signRefreshToken(storeUser.id);
        res.status(200).send({ accessToken, refreshToken });
        
	} catch (error) {
		res.status(400).send(error.message);
	}
});
router.post("/login", async (req, res,next) => {
	try {
		const result = await user.findOne({ email: req.body.email });
		if (!result) {
            throw createError.NotFound("user not registered");
		}
        const isMatch = await result.isValidPassword(req.body.password);

        if (!isMatch) {
            throw createError.Unauthorized("username or password invalid");
        }
        //generate access token for authorized user
        const accessToken = await signAccessToken(result.id);
        const refreshToken = await signRefreshToken(result.id);
        res.send({accessToken,refreshToken});

	} catch (error) {
		res.status(400).send(error);
	}
});
router.post("/refresh-token", async (req, res) => {
   try {
       const { refreshToken } = req.body;
       if (!refreshToken) throw createError.BadRequest();
       const userId = await verifyRefreshToken(refreshToken);
       //create a new acccess token as well as refresh token 
       const accessToken = await signAccessToken(userId);
       const refToken = await signRefreshToken(userId);
       res.send({ accessToken:accessToken, refreshToken:refToken });
   } catch (error) {
       res.status(400).send(error.message);
   }    
});
router.post("/logout", async (req, res) => {
	res.send("logout");
});

module.exports = router;
