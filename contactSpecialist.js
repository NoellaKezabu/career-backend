// routes/contactSpecialist.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// ✅ Define the schema for contact submissions
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  interestArea: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

// ✅ Create the model if not already created
const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

// ✅ POST route to save contact form data
router.post("/", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.json({ success: true, message: "Contact saved" });
  } catch (error) {
    console.error("❌ Error saving contact:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// ✅ GET route to fetch all submitted contact forms
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts); // Sends back an array
  } catch (error) {
    console.error("❌ Error retrieving contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

module.exports = router;
