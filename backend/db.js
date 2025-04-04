const mongoose = require("mongoose");
const { string } = require("zod");

const hostelSchema = mongoose.Schema({
  hostelImages: [{ type: String }],
  messImage: [{ type: String }],
  message: String,
  hostelMessage: String,
  messMessage: String,
  hostel: String,
});

const hostelModel = mongoose.model("hostel", hostelSchema);

module.exports = hostelModel;
