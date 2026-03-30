const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  schoolId: { type: String, unique: true, required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // school admin
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("School", SchoolSchema);