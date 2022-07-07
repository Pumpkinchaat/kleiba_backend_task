const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username of User is required"],
    trim: true,
    unique: [true, "The username should be unique"],
  },
  password: {
    type: String,
    minlength: [8, "The password must be of atleast 8 digits long"],
  },
});

module.exports = model("User", userSchema);
