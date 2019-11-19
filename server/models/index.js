const mongoose = require("mongoose");

mongoose.set("debug", true);
// allows us to use promises with mongoose - async javascript easier
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

// allows us to use the db variable within our variable as db.poll or User
module.exports.User = require("./user");
module.exports.Poll = require("./poll");
