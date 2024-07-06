

const express = require('express');
const router = express.Router();
const {getAllApparts, addAppart,searchByParams, getOneAppart,deleteOneAppart } = require("../../controllers/apparts");
const authenticate = require('../../middlewares/authenticate');

router.get('/', getAllApparts);
router.post('/add',authenticate, addAppart);
router.get("/search", searchByParams);
router.get('/:id', getOneAppart)
router.delete('/:id', deleteOneAppart)

module.exports = router;
