const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    default: "Anonim"
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, "Set password for user"],
  },
  token: {
    type: String,
  },
});

const User = model("User", userSchema);

module.exports = User;
