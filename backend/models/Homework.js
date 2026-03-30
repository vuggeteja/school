const mongoose = require("mongoose");

const HomeworkSchema = new mongoose.Schema({
  class: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  schoolId: { type: String, required: true },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // admin
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Homework", HomeworkSchema);