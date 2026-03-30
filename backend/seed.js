require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const School = require("./models/School");
const Student = require("./models/Student");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing data and drop indexes
    await mongoose.connection.db.dropCollection('users').catch(() => {});
    await mongoose.connection.db.dropCollection('schools').catch(() => {});
    await mongoose.connection.db.dropCollection('students').catch(() => {});

    // Create super admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    const superAdmin = new User({
      name: "Super Admin",
      email: "admin@school.com",
      password: hashedPassword,
      role: "superadmin"
    });
    await superAdmin.save();
    console.log("Super admin created");

    // Create a school admin
    const schoolAdminPassword = await bcrypt.hash("admin123", salt);
    const schoolAdmin = new User({
      name: "School Admin",
      email: "schooladmin@school.com",
      password: schoolAdminPassword,
      role: "admin",
      schoolId: "SCH001"
    });
    await schoolAdmin.save();

    // Create school
    const school = new School({
      name: "Demo School",
      address: "123 School Street",
      schoolId: "SCH001",
      adminId: schoolAdmin._id
    });
    await school.save();
    console.log("School created");

    // Create a parent
    const parentPassword = await bcrypt.hash("parent123", salt);
    const parent = new User({
      name: "John Doe",
      email: "parent@school.com",
      password: parentPassword,
      mobile: "1234567890",
      role: "parent",
      schoolId: "SCH001"
    });
    await parent.save();

    // Create students
    const student1 = new Student({
      name: "Alice Johnson",
      class: "10th Grade",
      rollNumber: "001",
      parentId: parent._id,
      schoolId: "SCH001",
      dateOfBirth: new Date("2008-05-15"),
      address: "456 Home Street"
    });
    await student1.save();

    const student2 = new Student({
      name: "Bob Smith",
      class: "9th Grade",
      rollNumber: "002",
      parentId: parent._id,
      schoolId: "SCH001",
      dateOfBirth: new Date("2009-03-20"),
      address: "456 Home Street"
    });
    await student2.save();

    // Update parent with children
    parent.children = [student1._id, student2._id];
    await parent.save();

    console.log("Sample data created successfully!");
    console.log("Login credentials:");
    console.log("Super Admin: admin@school.com / admin123");
    console.log("School Admin: schooladmin@school.com / admin123");
    console.log("Parent: parent@school.com / parent123");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();