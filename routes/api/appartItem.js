

const express = require('express');
const router = express.Router();
const getAllApparts = require("../../controllers/apparts");

router.get('/', getAllApparts);

module.exports = router;
