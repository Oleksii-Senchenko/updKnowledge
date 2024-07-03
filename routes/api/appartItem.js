

const express = require('express');
const router = express.Router();
const {getAllApparts, addAppart} = require("../../controllers/apparts");

router.get('/', getAllApparts);
router.post('/add', addAppart);

module.exports = router;
