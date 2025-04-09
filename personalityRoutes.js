// routes/personalityRoutes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Schema for personality test results
const personalitySchema = new mongoose.Schema({
  name: { type: String, default: "Anonymous Student" },
  email: { type: String, default: "" },
  trait: { type: String, required: true },
  careers: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

// Model
const PersonalityResult = mongoose.model("PersonalityResult", personalitySchema);

// POST: Save personality test result
router.post("/", async (req, res) => {
  try {
    const { name, email, trait, careers } = req.body;

    if (!trait || !careers || !Array.isArray(careers)) {
      return res.status(400).json({ success: false, error: "Missing or invalid trait/careers" });
    }

    const newResult = new PersonalityResult({ name, email, trait, careers });
    await newResult.save();

    res.json({ success: true, result: newResult });
  } catch (err) {
    console.error("❌ Error saving personality result:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// GET: Fetch all personality results
router.get("/", async (req, res) => {
  try {
    const results = await PersonalityResult.find().sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    console.error("❌ Error fetching results:", err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
