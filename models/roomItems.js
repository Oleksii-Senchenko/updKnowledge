const { Schema, model } = require("monguse");

const appartamentsSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
    require: [true, "Please fill the input"],
  },
  price: {
    type: String,
  },
});

const Apparts = model("Apparts", appartamentsSchema)
module.exports = Apparts