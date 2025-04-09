// models/Specialist.js
const mongoose = require("mongoose");

const SpecialistSchema = new mongoose.Schema({
  email: String,
  password: String,
});

module.exports = mongoose.model("Specialist", SpecialistSchema);
