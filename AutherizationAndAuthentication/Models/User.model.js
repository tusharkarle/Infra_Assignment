const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

//use the pre before saving
userSchema.pre("save", async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
 });

//check the password if matching
userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
        
    } catch (error) {
        throw error;
    }
}

const user = mongoose.model("user", userSchema);

module.exports = user;
