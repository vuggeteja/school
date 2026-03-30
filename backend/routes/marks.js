const router = require("express").Router();
const Marks = require("../models/Marks");
const Student = require("../models/Student");
const auth = require("../middleware/auth");

// Middleware to check if user is admin or superadmin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

// Get marks for school/student
router.get("/", auth, async (req, res) => {
  try {
    const { studentId } = req.query;
    const query = req.user.role === "superadmin" ? {} : { schoolId: req.user.schoolId };
    if (studentId) query.studentId = studentId;

    const marks = await Marks.find(query).populate("studentId", "name class");
    res.json(marks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add marks (admin only)
router.post("/", auth, requireAdmin, async (req, res) => {
  const { studentId, subject, marks, maxMarks, examType, date } = req.body;

  try {
    // Verify student exists in school
    const student = await Student.findById(studentId);
    if (!student || (req.user.role !== "superadmin" && student.schoolId !== req.user.schoolId)) {
      return res.status(400).json({ message: "Invalid student" });
    }

    const marksEntry = new Marks({
      studentId,
      subject,
      marks,
      maxMarks: maxMarks || 100,
      examType: examType || "final",
      date: new Date(date),
      schoolId: req.user.role === "superadmin" ? student.schoolId : req.user.schoolId,
      enteredBy: req.user.id
    });

    await marksEntry.save();
    res.status(201).json(marksEntry);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update marks
router.put("/:id", auth, requireAdmin, async (req, res) => {
  try {
    const marksEntry = await Marks.findById(req.params.id);
    if (!marksEntry || (req.user.role !== "superadmin" && marksEntry.schoolId !== req.user.schoolId)) {
      return res.status(404).json({ message: "Marks not found" });
    }

    Object.assign(marksEntry, req.body);
    await marksEntry.save();
    res.json(marksEntry);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;