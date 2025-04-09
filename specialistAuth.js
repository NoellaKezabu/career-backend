// routes/specialistAuth.js
const express = require("express");
const router = express.Router();
const Specialist = require("../models/Specialist");

// Dummy example - don’t use plaintext passwords in production
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const specialist = await Specialist.findOne({ email, password });

  if (!specialist) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  // You’ll later replace this with a JWT token
  res.json({ success: true, message: "Login successful" });
});

module.exports = router;
