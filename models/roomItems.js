const { Schema, model } = require("mongoose");

const appartamentsSchema = new Schema({
  location: {
    type: String,
    require: [true, "Please fill the input"],
  },
  name: {
    type: String,
    require: [true, "Please fill the input"],
  },
  description: {
    type: String,
    require: [true, "Please fill the input"],
  },
  price: {
    type: Number,
    require: [true, "Please fill the input"],
  },
  hasBalcony: Boolean,
});
appartamentsSchema.index({ "$**": "text" });
const Apparts = model("Apparts", appartamentsSchema);
module.exports = Apparts;
