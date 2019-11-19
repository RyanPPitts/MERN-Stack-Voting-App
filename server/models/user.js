const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// structure of data being inputted
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  polls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poll" }]
});

// this will take affect before the password saves.  Encrypt before saving to db
// explanation for below - if we send a different password we are going to check if its correct or not
// querying the database we dont have to do anything
// hash the password so its not visible
// 10 is how strong the hash is
// this.password - how its going to be saved as a hashed password
userSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function(attempt, next) {
  try {
    return await bcrypt.compare(attempt, this.password);
  } catch (err) {
    return next(err);
  }
};

module.exports = mongoose.model("User", userSchema);
