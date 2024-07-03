const HttpError = require("../helpers/HttpError");
const tryCatch = require("../middlewares/tryCatch");
const Apparts = require("../models/roomItems");
const addSchemaJoiApparts = require("../schemaJOI/apparts");

const getAllApparts = tryCatch(async (req, res) => {
  const result = await Apparts.find();
  if (result.length === 0) {
    console.log("is empty");
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
  res.status(201).json(newAppart);
});





const searchByParams = tryCatch(async (req, res) => {
    const { location, price, hasBalcony } = req.query; 

    
    let parseBalcony;
    let conditions = {};
  
    if (location) {
      conditions.location = location;
    }
    if (price !== undefined) {
        conditions.price = { $lt: parseInt(price, 10) };
    }
    
    if (typeof hasBalcony === 'string') {
        parseBalcony = JSON.parse(hasBalcony.toLowerCase());
    } else if (typeof hasBalcony === 'undefined') {
    } 
     else  {
        parseBalcony = !!hasBalcony; 
    }

    if (typeof parseBalcony === 'boolean') {
        conditions.hasBalcony = parseBalcony;
    }
    
    console.log('Условия поиска:', conditions);
  
    const result = await Apparts.find(conditions);
  
    console.log('Результаты поиска:', result);
    
    res.json(result);
  });
  
  


module.exports = { getAllApparts, addAppart, searchByParams };
