const router = require("express").Router();
const Fee = require("../models/Fee");
const Student = require("../models/Student");
const auth = require("../middleware/auth");

// Middleware to check if user is admin or superadmin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

// Get fees for school
router.get("/", auth, async (req, res) => {
  try {
    const query = req.user.role === "superadmin" ? {} : { schoolId: req.user.schoolId };
    const fees = await Fee.find(query).populate("studentId", "name class");
    res.json(fees);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add fee (admin only)
router.post("/", auth, requireAdmin, async (req, res) => {
  const { studentId, amount, description, dueDate } = req.body;

  try {
    // Verify student exists in school
    const student = await Student.findById(studentId);
    if (!student || (req.user.role !== "superadmin" && student.schoolId !== req.user.schoolId)) {
      return res.status(400).json({ message: "Invalid student" });
    }

    const fee = new Fee({
      studentId,
      amount,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
      schoolId: req.user.role === "superadmin" ? student.schoolId : req.user.schoolId
    });

    await fee.save();
    res.status(201).json(fee);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update fee status
router.put("/:id", auth, requireAdmin, async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);
    if (!fee || (req.user.role !== "superadmin" && fee.schoolId !== req.user.schoolId)) {
      return res.status(404).json({ message: "Fee not found" });
    }

    Object.assign(fee, req.body);
    if (req.body.status === "paid" && !fee.paidDate) {
      fee.paidDate = new Date();
    }
    await fee.save();
    res.json(fee);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;