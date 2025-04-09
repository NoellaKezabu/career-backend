// backend/routes/employerJobs.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define job schema
const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,
  salary: String,
  createdAt: { type: Date, default: Date.now }
});

// Create model
const Job = mongoose.models.Job ||mongoose.model("Job", jobSchema);

// POST job
router.post("/", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.json({ success: true, message: "Job posted" });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// GET all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

module.exports = router;
