const HttpError = require("../helpers/HttpError");
const tryCatch = require("../middlewares/tryCatch");
const Apparts = require("../models/roomItems");
const addSchemaJoiApparts = require("../schemaJOI/apparts");

const getAllApparts = tryCatch(async (req, res) => {
  const result = await Apparts.find();
  if (result.length === 0) {
    throw HttpError(500, "Is empty");
  } else {
    res.json(result).status(200);
  }
});

const addAppart = tryCatch(async (req, res) => {
  const { error } = addSchemaJoiApparts.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const dublicationChek = await Apparts.findOne({ name: req.body.name });
  if (dublicationChek) {
    return res.status(400).json({ error: "Item has been upload" });
  }
  const newAppart = await Apparts.create(req.body);
  if (!newAppart) {
    throw HttpError(500, "Somethink went wrong. Please try later :(");
  }
  res.status(201).json(newAppart);
});

const searchByParams = tryCatch(async (req, res) => {
  const { location, price, hasBalcony } = req.query;

  let conditions = {};

  if (location) {
    conditions.location = location;
  }
  if (price) {
    conditions.price = { $lte: parseInt(price, 10) };
  }

  if (hasBalcony !== undefined) {
    let parseBalcony =
      typeof hasBalcony === "string"
        ? JSON.parse(hasBalcony.toLowerCase())
        : !!hasBalcony;
    conditions.hasBalcony = parseBalcony;
  }

  const result = await Apparts.find(conditions);

  if (!result || result.length === 0) {
    throw HttpError(404, "Nothing found :(");
  }

  res.json(result).status(200);
});

const getOneAppart = tryCatch(async (req, res) => {
  const { id } = req.params;
  const result = await Apparts.findById({ _id: id });

  if (!result || result.length === 0) {
    throw HttpError(404, "Nothing found :(");
  }
  res.json(result).status(200);
});

const deleteOneAppart = tryCatch(async(req, res)=>{
    const { id } = req.params;

    const result = await Apparts.findByIdAndDelete({_id: id})
    
    if (!result) {
        throw HttpError(500, 'Somethink went wrong :(' )
    }

    res.json(200, "Succsess deleted :)")
})
module.exports = { getAllApparts, addAppart, searchByParams, getOneAppart, deleteOneAppart };
