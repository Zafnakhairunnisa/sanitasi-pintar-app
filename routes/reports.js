const express = require("express");
const router = express.Router();
const { Report } = require("../models");

// Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new report
router.post("/", async (req, res) => {
  try {
    const newReport = await Report.create(req.body);
    res.status(201).json(newReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Tambahkan route lain sesuai kebutuhan (GET by ID, PUT, DELETE)

module.exports = router;
