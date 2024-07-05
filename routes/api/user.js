const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../../controllers/user");
const authenticate = require("../../middlewares/authenticate");
const validateBody = require("../../middlewares/validateBody");
const {registerSchema, loginSchema} = require("../../schemaJOI/user");

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.post("/logout", authenticate, logout)

module.exports = router;
