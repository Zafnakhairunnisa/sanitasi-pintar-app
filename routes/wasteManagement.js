const express = require("express");
const router = express.Router();
const { WasteManagement } = require("../models");

// Get all waste management records
router.get("/", async (req, res) => {
  try {
    const wasteManagements = await WasteManagement.findAll();
    res.json(wasteManagements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific waste management record
router.get("/:id", async (req, res) => {
  try {
    const wasteManagement = await WasteManagement.findByPk(req.params.id);
    if (wasteManagement) {
      res.json(wasteManagement);
    } else {
      res.status(404).json({ message: "Waste management record not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new waste management record
router.post("/", async (req, res) => {
  try {
    const newWasteManagement = await WasteManagement.create(req.body);
    res.status(201).json(newWasteManagement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a waste management record
router.put("/:id", async (req, res) => {
  try {
    const updatedWasteManagement = await WasteManagement.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedWasteManagement[0] > 0) {
      res.json({ message: "Waste management record updated successfully" });
    } else {
      res.status(404).json({ message: "Waste management record not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a waste management record
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await WasteManagement.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Waste management record deleted successfully" });
    } else {
      res.status(404).json({ message: "Waste management record not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
