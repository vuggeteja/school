const mongoose = require("mongoose");

const MarksSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  subject: { type: String, required: true },
  marks: { type: Number, required: true },
  maxMarks: { type: Number, default: 100 },
  examType: { type: String, enum: ["midterm", "final", "quiz"], default: "final" },
  date: { type: Date, required: true },
  schoolId: { type: String, required: true },
  enteredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // admin
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Marks", MarksSchema);