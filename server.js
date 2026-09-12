require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const projectRoutes = require("./routes/Projectroutes");
const aiRoutes = require("./routes/aiRoutes");

const errorHandler = require("./middleware/errormiddleware");

const app = express();

// =========================
// DATABASE CONNECTION
// =========================

connectDB();

// =========================
// MIDDLEWARE
// =========================

app.use(cors());

app.use(express.json());

// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {
  res.status(200).json({
    message:
      "Productivity Dashboard Backend is running 🚀",
  });
});

// =========================
// AUTH ROUTES
// =========================

app.use(
  "/api/auth",
  authRoutes
);

// =========================
// TASK ROUTES
// =========================

app.use(
  "/api/tasks",
  taskRoutes
);

// =========================
// PROJECT ROUTES
// =========================

app.use(
  "/api/projects",
  projectRoutes
);

// =========================
// AI ROUTES
// =========================

app.use(
  "/api/ai",
  aiRoutes
);

// =========================
// 404 ROUTE
// =========================

app.use((req, res) => {
  res.status(404).json({
    message: "API route not found",
  });
});

// =========================
// ERROR HANDLER
// =========================

app.use(errorHandler);

// =========================
// SERVER
// =========================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});