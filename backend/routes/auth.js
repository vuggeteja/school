const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const School = require("../models/School");
const auth = require("../middleware/auth");

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role, schoolId: user.schoolId },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.json({ token, user: { id: user._id, name: user.name, role: user.role, schoolId: user.schoolId } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Register (only for superadmin to create school admins, or school admin to create parents)
router.post("/register", async (req, res) => {
  const { name, email, password, mobile, role, schoolId } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
      role,
      schoolId: role === "superadmin" ? null : schoolId
    });

    await user.save();

    // If creating school admin, create school
    if (role === "admin") {
      const school = new School({
        name: `${name}'s School`,
        schoolId,
        adminId: user._id
      });
      await school.save();
    }

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get parents for school
router.get("/parents", auth, async (req, res) => {
  try {
    const query = req.user.role === "superadmin" ? {} : { schoolId: req.user.schoolId };
    const parents = await User.find({ ...query, role: "parent" });
    res.json(parents);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;