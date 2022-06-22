const mongoose = require("mongoose");

const tripSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  data: { type: String, required: true },
  mezzo: { type: String, required: true },
  coordinate: { type: [], required: true },
  tappe: { type: [], required: true },
});

module.exports = mongoose.model("Trip", tripSchema);
