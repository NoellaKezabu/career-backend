// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const contactSpecialistRoute = require("./routes/contactSpecialist");
const jobRoutes = require("./routes/jobRoutes"); // ✅ Only one import
const applicationRoutes = require("./routes/applicationRoutes");
const personalityRoutes = require("./routes/personalityRoutes");

app.use("/api/contact-specialist", contactSpecialistRoute);
app.use("/api/jobs", jobRoutes); // ✅ Job-related routes
app.use("/api/applications", applicationRoutes);
app.use("/api/personality", personalityRoutes);
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/career_guidance", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
