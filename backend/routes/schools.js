const router = require("express").Router();
const School = require("../models/School");
const User = require("../models/User");
const auth = require("../middleware/auth");

// Middleware to check if user is superadmin
const requireSuperAdmin = (req, res, next) => {
  if (req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

// Get all schools (superadmin only)
router.get("/", auth, requireSuperAdmin, async (req, res) => {
  try {
    const schools = await School.find().populate("adminId", "name email");
    res.json(schools);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create school (superadmin only)
router.post("/", auth, requireSuperAdmin, async (req, res) => {
  const { name, address, schoolId, adminName, adminEmail, adminPassword, adminMobile } = req.body;

  try {
    // Check if schoolId exists
    const existingSchool = await School.findOne({ schoolId });
    if (existingSchool) return res.status(400).json({ message: "School ID already exists" });

    // Create admin user
    const salt = await require("bcryptjs").genSalt(10);
    const hashedPassword = await require("bcryptjs").hash(adminPassword, salt);

    const admin = new User({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      mobile: adminMobile,
      role: "admin",
      schoolId
    });

    await admin.save();

    // Create school
    const school = new School({
      name,
      address,
      schoolId,
      adminId: admin._id
    });

    await school.save();
    res.status(201).json(school);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update school
router.put("/:id", auth, requireSuperAdmin, async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ message: "School not found" });

    Object.assign(school, req.body);
    await school.save();
    res.json(school);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;