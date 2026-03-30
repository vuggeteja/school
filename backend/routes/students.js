const router = require("express").Router();
const Student = require("../models/Student");
const User = require("../models/User");
const auth = require("../middleware/auth");

// Middleware to check if user is admin or superadmin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

// Get all students for the school
router.get("/", auth, async (req, res) => {
  try {
    const query = req.user.role === "superadmin" ? {} : { schoolId: req.user.schoolId };
    const students = await Student.find(query).populate("parentId", "name email");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add new student (admin only)
router.post("/", auth, requireAdmin, async (req, res) => {
  const { name, class: studentClass, rollNumber, parentId, dateOfBirth, address } = req.body;

  try {
    // Verify parent exists and is in same school
    const parent = await User.findById(parentId);
    if (!parent || parent.role !== "parent" || (req.user.role !== "superadmin" && parent.schoolId !== req.user.schoolId)) {
      return res.status(400).json({ message: "Invalid parent" });
    }

    const student = new Student({
      name,
      class: studentClass,
      rollNumber,
      parentId,
      schoolId: req.user.role === "superadmin" ? req.body.schoolId : req.user.schoolId,
      dateOfBirth,
      address
    });

    await student.save();

    // Add student to parent's children
    parent.children.push(student._id);
    await parent.save();

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update student
router.put("/:id", auth, requireAdmin, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student || (req.user.role !== "superadmin" && student.schoolId !== req.user.schoolId)) {
      return res.status(404).json({ message: "Student not found" });
    }

    Object.assign(student, req.body);
    await student.save();
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete student
router.delete("/:id", auth, requireAdmin, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student || (req.user.role !== "superadmin" && student.schoolId !== req.user.schoolId)) {
      return res.status(404).json({ message: "Student not found" });
    }

    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;