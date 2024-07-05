const express = require('express');
const router = express.Router()
const {register, login, logout} = require('../../controllers/user');
const authenticate = require('../../middlewares/authenticate');
router.post("/register", register )
router.post("/login", login )
router.post("/logout",authenticate, logout )

module.exports = router