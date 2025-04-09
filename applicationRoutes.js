const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define application schema
const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  jobTitle: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Application = mongoose.models.Application || mongoose.model("Application", applicationSchema);

// POST: Submit a job application
router.post("/", async (req, res) => {
  try {
    const newApp = new Application(req.body);
    await newApp.save();
    res.json({ success: true });
  } catch (err) {
    console.error("Error saving application:", err);
    res.status(500).json({ success: false });
  }
});

// GET: All applications
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ success: false });
  }
});

// GET: Auto-filter demo (optional logic)
router.get("/auto-filter", async (req, res) => {
  try {
    const applications = await Application.find();
    const filtered = applications.filter(
      app => app.jobTitle && app.jobTitle.toLowerCase().includes("developer")
    );
    res.json({ filtered });
  } catch (err) {
    console.error("Auto Filter Error:", err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
