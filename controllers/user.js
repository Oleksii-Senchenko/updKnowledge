const bcrypt = require("bcryptjs");
const HttpError = require("../helpers/HttpError");
const tryCatch = require("../middlewares/tryCatch");
const User = require("../models/user");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const register = tryCatch(async (req, res) => {



  const { email, password } = req.body;

  const chekEmail = await User.findOne({ email });
  if (chekEmail) {
    throw HttpError(409, "Email in use");
  }

  const hashPass = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPass });

  const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: "12h" });

  const result = await User.findByIdAndUpdate(
    newUser._id,
    { token },
    { new: true }
  );
  if (!result) {
    throw HttpError(500, "Somethink went wrong...");
  }
  res
    .json({
      name: newUser.name,
      email: newUser.email,
      token: token,
    })
    .status(201);
});

const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const comparePass = await bcrypt.compare(password, user.password);
  if (!comparePass) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "12h" });

  const result = await User.findOneAndUpdate(user._id, { token });
  if (!result) {
    throw HttpError(500, "Somethink went wrong...");
  }

  res.status(201).json({
    email: email,
    name: user.name,
    token: token,
  });
});

const logout = tryCatch(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
});

module.exports = { register, login, logout };
