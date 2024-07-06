const { Schema, model } = require("mongoose");

const appartamentsSchema = new Schema({
  location: {
    type: String,
    required: [true, "Please fill the input"],
  },
  name: {
    type: String,
    required: [true, "Please fill the input"],
  },
  description: {
    type: String,
    required: [true, "Please fill the input"],
  },
  price: {
    type: Number,
    required: [true, "Please fill the input"],
  },
  hasBalcony: { type: Boolean },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});
appartamentsSchema.index({ "$**": "text" });
const Apparts = model("Apparts", appartamentsSchema);
module.exports = Apparts;
