require("dotenv").config(); // MUST be first line

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/students", require("./routes/students"));
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/fees", require("./routes/fees"));
app.use("/api/homework", require("./routes/homework"));
app.use("/api/marks", require("./routes/marks"));
app.use("/api/schools", require("./routes/schools"));

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running on port 5000")
);