const express = require("express");

const router = express.Router();

const {
  generateTasks,
} = require("../controllers/aicontroller");

const protect = require("../middleware/authmiddleware");

// =========================
// AI TASK GENERATION ROUTE
// =========================

router.post(
  "/generate-tasks",
  protect,
  generateTasks
);

module.exports = router;