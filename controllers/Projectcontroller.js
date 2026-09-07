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
   UPDATE PROJECT
========================= */

const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const {
      name,
      description,
      status,
      progress,
    } = req.body;

    // Name validation
    if (
      name !== undefined &&
      (!name.trim() || name.trim().length < 2)
    ) {
      return res.status(400).json({
        message:
          "Project name must be at least 2 characters",
      });
    }

    // Status validation
    const allowedStatus = [
      "Planning",
      "In Progress",
      "Completed",
    ];

    if (
      status !== undefined &&
      !allowedStatus.includes(status)
    ) {
      return res.status(400).json({
        message: "Invalid project status",
      });
    }

    // Progress validation
    if (
      progress !== undefined &&
      (
        typeof progress !== "number" ||
        progress < 0 ||
        progress > 100
      )
    ) {
      return res.status(400).json({
        message:
          "Progress must be a number between 0 and 100",
      });
    }

    // Update values
    project.name =
      name !== undefined ? name : project.name;

    project.description =
      description !== undefined
        ? description
        : project.description;

    project.status =
      status !== undefined
        ? status
        : project.status;

    project.progress =
      progress !== undefined
        ? progress
        : project.progress;

    const updatedProject = await project.save();

    res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });

  } catch (error) {
    next(error);
  }
};


/* =========================
   DELETE PROJECT
========================= */

const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    await project.deleteOne();

    res.status(200).json({
      message: "Project deleted successfully",
    });

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
  updateProject,
  deleteProject,
};