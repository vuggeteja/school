const mongoose = require("mongoose");

const FeeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  amount: { type: Number, required: true },
  description: String,
  dueDate: Date,
  status: { type: String, enum: ["paid", "unpaid", "overdue"], default: "unpaid" },
  schoolId: { type: String, required: true },
  paidDate: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Fee", FeeSchema);