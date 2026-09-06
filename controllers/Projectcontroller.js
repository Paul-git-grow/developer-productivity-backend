const Project = require("../models/Projects");

/* =========================
   CREATE PROJECT
========================= */

const createProject = async (req, res, next) => {
  try {
    const {
      name,
      description,
      status,
      progress,
    } = req.body;

    // 1. Project name validation
    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        message: "Project name must be at least 2 characters",
      });
    }

    // 2. Project status validation
    const allowedStatus = [
      "Planning",
      "In Progress",
      "Completed",
    ];

    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid project status",
      });
    }

    // 3. Progress validation
    if (
      progress !== undefined &&
      (
        typeof progress !== "number" ||
        progress < 0 ||
        progress > 100
      )
    ) {
      return res.status(400).json({
        message: "Progress must be a number between 0 and 100",
      });
    }

    // Create project
    const project = await Project.create({
      name,
      description,
      status,
      progress,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });

  } catch (error) {
    next(error);
  }
};

/* =========================
   GET PROJECTS
========================= */

const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};


/* =========================
   EXPORTS
========================= */

module.exports = {
  createProject,
  getProjects,
};