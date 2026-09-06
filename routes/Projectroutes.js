const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
} = require("../controllers/Projectcontroller");

const protect = require("../middleware/authmiddleware");

// CREATE PROJECT
router.post("/", protect, createProject);

// GET ALL PROJECTS
router.get("/", protect, getProjects);

module.exports = router;