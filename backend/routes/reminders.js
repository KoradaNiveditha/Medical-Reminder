const express = require("express");
const router = express.Router();
const Reminder = require("../models/Reminder");
const auth = require("../middleware/auth");

// Get all reminders
router.get("/", auth, async (req, res) => {
  try {
    const reminders = await Reminder.find({ userEmail: req.user.email });
    res.json(reminders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching reminders" });
  }
});

// Add new reminder
router.post("/", auth, async (req, res) => {
  const { medicineName, times } = req.body;
  const userEmail = req.user.email;

  if (!userEmail) return res.status(400).json({ message: "User email not found in token" });
  if (!medicineName || !times || times.length === 0)
    return res.status(400).json({ message: "medicineName and times are required" });

  const formattedTimes = Array.isArray(times) ? times : [times];

  const newReminder = new Reminder({
    userEmail,
    medicineName,
    times: formattedTimes,
  });

  try {
    const savedReminder = await newReminder.save();
    console.log(`Reminder saved: ${savedReminder.medicineName} for ${userEmail}`);
    res.json(savedReminder);
  } catch (err) {
    console.error("Error adding reminder:", err);
    res.status(500).json({ message: "Error adding reminder", error: err.message });
  }
});

// Delete reminder
router.delete("/:id", auth, async (req, res) => {
  try {
    await Reminder.findByIdAndDelete(req.params.id);
    res.json({ message: "Reminder deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting reminder" });
  }
});

module.exports = router;
