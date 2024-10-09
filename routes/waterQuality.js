const express = require("express");
const router = express.Router();
const { WaterQuality } = require("../models");

// Get all water quality records
router.get("/", async (req, res) => {
  try {
    const waterQualities = await WaterQuality.findAll();
    res.json(waterQualities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific water quality record
router.get("/:id", async (req, res) => {
  try {
    const waterQuality = await WaterQuality.findByPk(req.params.id);
    if (waterQuality) {
      res.json(waterQuality);
    } else {
      res.status(404).json({ message: "Water quality record not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new water quality record
router.post("/", async (req, res) => {
  try {
    const newWaterQuality = await WaterQuality.create(req.body);
    res.status(201).json(newWaterQuality);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a water quality record
router.put("/:id", async (req, res) => {
  try {
    const updatedWaterQuality = await WaterQuality.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedWaterQuality[0] > 0) {
      res.json({ message: "Water quality record updated successfully" });
    } else {
      res.status(404).json({ message: "Water quality record not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a water quality record
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await WaterQuality.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Water quality record deleted successfully" });
    } else {
      res.status(404).json({ message: "Water quality record not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
