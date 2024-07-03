const tryCatch = require("../middlewares/tryCatch");
const Apparts = require("../models/roomItems");

const getAllApparts = tryCatch(async (req, res) => {
  const result = await Apparts.find();
  if (result.length === 0) {
    console.log("is empty");
  } else {
    console.log(result);
  }
});

const addAppart = tryCatch(async (req, res) => {
  const dublicationChek = await Apparts.findOne({name: req.body.name});
  if (dublicationChek) {
   return res.status(400).json({error: "Item has been upload"})
}
const newAppart = await Apparts.create(req.body);
res.status(201).json(newAppart);
  
});


module.exports = { getAllApparts, addAppart };
