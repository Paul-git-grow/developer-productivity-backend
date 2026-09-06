const Task = require("../models/tasks");

/* =========================
   CREATE TASK
========================= */

const createTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
    } = req.body;

    // Title validation
    if (!title || title.trim().length < 2) {
      return res.status(400).json({
        message: "Task title must be at least 2 characters",
      });
    }

    // Status validation
    const allowedStatus = [
      "Pending",
      "In Progress",
      "Completed",
    ];

    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid task status",
      });
    }

    // Priority validation
    const allowedPriority = [
      "Low",
      "Medium",
      "High",
    ];

    if (priority && !allowedPriority.includes(priority)) {
      return res.status(400).json({
        message: "Invalid task priority",
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};


/* =========================
   GET TASKS
========================= */

const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};


/* =========================
   UPDATE TASK
========================= */
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const {
      title,
      description,
      status,
      priority,
      dueDate,
    } = req.body;

    // Title validation
    if (title !== undefined && title.trim().length < 2) {
      return res.status(400).json({
        message: "Task title must be at least 2 characters",
      });
    }

    // Status validation
    const allowedStatus = [
      "Pending",
      "In Progress",
      "Completed",
    ];

    if (status !== undefined && !allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid task status",
      });
    }

    // Priority validation
    const allowedPriority = [
      "Low",
      "Medium",
      "High",
    ];

    if (priority !== undefined && !allowedPriority.includes(priority)) {
      return res.status(400).json({
        message: "Invalid task priority",
      });
    }

    // Update values
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.priority = priority ?? task.priority;
    task.dueDate = dueDate ?? task.dueDate;

    const updatedTask = await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};



/* =========================
   DELETE TASK
========================= */

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


/* =========================
   EXPORTS
========================= */

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};