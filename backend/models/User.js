const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  mobile: { type: String, sparse: true }, // Allow null values and unique only for non-null
  role: { type: String, enum: ["superadmin", "admin", "parent"], required: true },
  schoolId: String, // null for superadmin
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], // for parents
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);