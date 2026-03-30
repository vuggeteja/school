const router = require("express").Router();
const Homework = require("../models/Homework");
const auth = require("../middleware/auth");

// Middleware to check if user is admin or superadmin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

// Get homework for school/class
router.get("/", auth, async (req, res) => {
  try {
    const { class: studentClass } = req.query;
    const query = req.user.role === "superadmin" ? {} : { schoolId: req.user.schoolId };
    if (studentClass) query.class = studentClass;

    const homework = await Homework.find(query).sort({ date: -1 });
    res.json(homework);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add homework (admin only)
router.post("/", auth, requireAdmin, async (req, res) => {
  const { class: studentClass, subject, description, date } = req.body;

  try {
    const homework = new Homework({
      class: studentClass,
      subject,
      description,
      date: new Date(date),
      schoolId: req.user.schoolId,
      assignedBy: req.user.id
    });

    await homework.save();
    res.status(201).json(homework);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update homework
router.put("/:id", auth, requireAdmin, async (req, res) => {
  try {
    const homework = await Homework.findById(req.params.id);
    if (!homework || (req.user.role !== "superadmin" && homework.schoolId !== req.user.schoolId)) {
      return res.status(404).json({ message: "Homework not found" });
    }

    Object.assign(homework, req.body);
    await homework.save();
    res.json(homework);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete homework
router.delete("/:id", auth, requireAdmin, async (req, res) => {
  try {
    const homework = await Homework.findById(req.params.id);
    if (!homework || (req.user.role !== "superadmin" && homework.schoolId !== req.user.schoolId)) {
      return res.status(404).json({ message: "Homework not found" });
    }

    await Homework.findByIdAndDelete(req.params.id);
    res.json({ message: "Homework deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;