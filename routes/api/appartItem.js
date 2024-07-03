

const express = require('express');
const router = express.Router();
const {getAllApparts, addAppart,searchByParams } = require("../../controllers/apparts");

router.get('/', getAllApparts);
router.post('/add', addAppart);
router.get("/search", searchByParams);

module.exports = router;
