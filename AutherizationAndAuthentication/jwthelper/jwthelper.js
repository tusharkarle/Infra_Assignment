const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const user = require("../Models/User.model");
require("dotenv").config();

module.exports = {
	signAccessToken: (userId) => {
		return new Promise((resolve, reject) => {
			const payload = {
				name: "yours truely", //ie it contains name as data
			};
			const secret = process.env.ACCESS_TOKEN_SECRET;
			const options = {
				expiresIn: "1min",
				issuer: "tusharkarle website",
				audience: userId,
			};

			jwt.sign(payload, secret, options, (err, token) => {
				if (err) reject(err);
				resolve(token);
			});
		});
	},
	verifyAccessToken: (req, res, next) => {
		if (!req.headers["authorization"])
			return next(createError.Unauthorized());
		const authHeader = req.headers[`authorization`];
		const BearerToken = authHeader.split(" ");
		const token = BearerToken[1]; //take the second element

		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
			if (err) {
				if (err.name === "JsonWebTokenError") {
					return next(createError.Unauthorized());
				} else {
					return next(createError.Unauthorized(err.message));
				}
			}
			req.payload = payload;
			next();
		});
	},
	signRefreshToken: (userId) => {
		return new Promise((resolve, reject) => {
			const payload = {};
			const secret = process.env.REFRESH_TOKEN_SECRET;
			const options = {
				expiresIn: "1y",
				issuer: "tusharkarle website",
				audience: userId.toString(),
			};

			jwt.sign(payload, secret, options, (err, token) => {
				if (err) reject(err);
				resolve(token);
			});
		});
	},
	verifyRefreshToken: (refreshToken) => {
		return new Promise((resolve, reject) => {
			jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET,
				(err, payload) => {
					if (err) return reject(createError.Unauthorized());
					const userId = payload.aud;
					resolve(userId);
				}
			);
		});
	},
};
