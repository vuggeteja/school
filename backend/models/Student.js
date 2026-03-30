const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  rollNumber: String,
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  schoolId: { type: String, required: true },
  dateOfBirth: Date,
  address: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Student", StudentSchema);