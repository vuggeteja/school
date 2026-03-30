const router = require("express").Router();
const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const auth = require("../middleware/auth");

// Middleware to check if user is admin or superadmin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

// Get attendance for school/date
router.get("/", auth, async (req, res) => {
  try {
    const { date } = req.query;
    const query = req.user.role === "superadmin" ? {} : { schoolId: req.user.schoolId };
    if (date) query.date = new Date(date);

    const attendance = await Attendance.find(query).populate("studentId", "name class");
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Mark attendance (admin only)
router.post("/", auth, requireAdmin, async (req, res) => {
  const { studentId, date, status } = req.body;

  try {
    // Verify student exists in school
    const student = await Student.findById(studentId);
    if (!student || (req.user.role !== "superadmin" && student.schoolId !== req.user.schoolId)) {
      return res.status(400).json({ message: "Invalid student" });
    }

    const attendance = new Attendance({
      studentId,
      date: new Date(date),
      status,
      schoolId: req.user.role === "superadmin" ? student.schoolId : req.user.schoolId,
      markedBy: req.user.id
    });

    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update attendance
router.put("/:id", auth, requireAdmin, async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance || (req.user.role !== "superadmin" && attendance.schoolId !== req.user.schoolId)) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    Object.assign(attendance, req.body);
    await attendance.save();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;