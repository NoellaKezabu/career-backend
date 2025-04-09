const mongoose = require("mongoose");

const SpecialistMessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  interestArea: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SpecialistMessage", SpecialistMessageSchema);
