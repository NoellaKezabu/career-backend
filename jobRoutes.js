// routes/jobRoutes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


// ============================
// 📦 Job Schema and Model
// ============================
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.models.Job ||mongoose.model("Job", jobSchema);


// ============================
// 📨 Application Schema and Model
// ============================
const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  jobTitle: String,
  createdAt: { type: Date, default: Date.now },
});

const Application = mongoose.model("Application", applicationSchema);


// ============================
// 📘 JOB ROUTES
// ============================

// 🔹 GET all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ success: false, error: "Failed to fetch jobs" });
  }
});

// 🔹 GET single job by ID (optional/future use)
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.json(job);
  } catch (err) {
    console.error("Error fetching job:", err);
    res.status(500).json({ success: false, error: "Failed to fetch job" });
  }
});

// 🔹 POST a new job
router.post("/", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.json({ success: true, message: "Job posted successfully" });
  } catch (err) {
    console.error("Error saving job:", err);
    res.status(500).json({ success: false, error: "Failed to post job" });
  }
});

// 🔹 PUT update a job by ID
router.put("/:id", async (req, res) => {
  try {
    await Job.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true, message: "Job updated successfully" });
  } catch (err) {
    console.error("Error updating job:", err);
    res.status(500).json({ success: false, error: "Failed to update job" });
  }
});

// 🔹 DELETE a job by ID
router.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Job deleted successfully" });
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(500).json({ success: false, error: "Failed to delete job" });
  }
});


// ============================
// 📥 APPLICATION ROUTES
// ============================

// 🔹 GET all applications submitted by students
router.get("/applications", async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ success: false });
  }
});

// 🔹 AUTO-FILTER: filter applicants based on dummy logic (e.g., by keyword)
router.get("/auto-filter", async (req, res) => {
  try {
    const applications = await Application.find();

    // Check if jobTitle exists before calling toLowerCase
    const filtered = applications.filter(app =>
      app.jobTitle && app.jobTitle.toLowerCase().includes("developer")
    );

    res.json({ filtered });
  } catch (err) {
    console.error("Auto Filter Error:", err);
    res.status(500).json({ success: false });
  }
});

// ✅ Export the router
module.exports = router;
