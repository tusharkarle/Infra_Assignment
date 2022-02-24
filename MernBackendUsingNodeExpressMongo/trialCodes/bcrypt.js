const bcrypt = require("bcrypt");

const passwordHashed = await bcrypt.hash(password, 10);

// this will give the hashed or encrypted password