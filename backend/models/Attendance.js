const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["present", "absent"], required: true },
  schoolId: { type: String, required: true },
  markedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // admin who marked
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Attendance", AttendanceSchema);