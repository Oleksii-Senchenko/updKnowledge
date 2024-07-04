const bcrypt = require("bcryptjs");
const HttpError = require("../helpers/HttpError");
const tryCatch = require("../middlewares/tryCatch");
const User = require("../models/user");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const regiter = tryCatch(async (req, res) => {
  const { name, email, password } = req.body;

  const chekEmail = await User.findOne({ email });
  if (chekEmail) {
    throw HttpError(409, "Email in use");
  }

  const hashPass = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPass });

  const token =  jwt.sign({id:newUser._id},  SECRET_KEY , { expiresIn: "12h" });

  await User.findByIdAndUpdate(newUser._id, { token }, { new: true });

  res
    .json({
      name: newUser.name,
      email: newUser.email,
      token: token,
    })
    .status(201);
});

module.exports = regiter;
