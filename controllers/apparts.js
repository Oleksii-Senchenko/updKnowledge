const tryCatch = require("../middlewares/tryCatch");
const Apparts = require("../models/roomItems");

const getAllApparts = tryCatch(async (req, res) => {
  const result = await Apparts.find();
  if (result.length === 0) {
    console.log("is empty");
  }else{

      console.log(result);
  }
});

module.exports = getAllApparts;
