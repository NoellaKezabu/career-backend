// routes/applicationRoutes.js
const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

// POST: Submit an application
router.post("/", async (req, res) => {
  try {
    const newApp = new Application(req.body);
    await newApp.save();
    res.json({ success: true, message: "Application submitted!" });
  } catch (error) {
    console.error("Application error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// GET: Fetch all applications
router.get("/", async (req, res) => {
  try {
    const apps = await Application.find().sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ success: false, error: "Error fetching applications" });
  }
});

module.exports = router;
