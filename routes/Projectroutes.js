const express = require("express");

const router = express.Router();

const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/Projectcontroller");

const protect = require("../middleware/authmiddleware");


/* =========================
   CREATE PROJECT
========================= */

router.post("/", protect, createProject);


/* =========================
   GET ALL PROJECTS
========================= */

router.get("/", protect, getProjects);


/* =========================
   UPDATE PROJECT
========================= */

router.put("/:id", protect, updateProject);


/* =========================
   DELETE PROJECT
========================= */

router.delete("/:id", protect, deleteProject);


module.exports = router;