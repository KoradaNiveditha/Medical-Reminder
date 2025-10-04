const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  medicineName: { type: String, required: true },
  times: { type: [String], required: true }, // array of strings
});

module.exports = mongoose.model("Reminder", reminderSchema);
