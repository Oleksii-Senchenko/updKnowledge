

const express = require('express');
const router = express.Router();
const {getAllApparts, addAppart,searchByParams, getOneAppart,deleteOneAppart } = require("../../controllers/apparts");

router.get('/', getAllApparts);
router.post('/add', addAppart);
router.get("/search", searchByParams);
router.get('/:id', getOneAppart)
router.delete('/:id', deleteOneAppart)

module.exports = router;
