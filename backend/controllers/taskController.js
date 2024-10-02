const { validationResult } = require("express-validator");
const Task = require("../models/Task");

// Get all tasks (admin or user can view) 
// need to be attention
exports.getTasks = async (req, res) => {
  /*const { status, priority, assigned_user } = req.query;
  const filters = { created_by: req.user._id }; // Non-admin can see their own tasks
  console.log(res.body)

  if (status) filters.status = status;
  if (priority) filters.priority = priority;
  if (req.user.role === "admin" && assigned_user)
    filters.assigned_user = assigned_user;

  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    // Pagination parameters from query
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    console.log(page, limit);

    let filters = {};

    if (userRole !== "admin") {
      filters = {
        $or: [
          {
            assigned_user: userId,
            created_by: userId,
          },
        ],
      };
    }

    const tasks = await Task.find(filters)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ created_at: -1 });

    console.log(tasks);

    const totalTasks = await Task.countDocuments(filters);
    res.json({
      currentPage: page,
      limit,
      totalTasks,
      totalPages: Math.ceil(count / limit),
      tasks: [tasks],
    });
    console.log(tasks);
  } catch (error) {
    res.status(500).json({ error: error, message: error.message });
    console.log(error.array());
  }*/
};

// Create a Task (only admin can assign)
exports.createTask = async (req, res) => {
  try {
    const { title, description, due_date, status, priority, assigned_user } =
      req.body;

    const created_by = req.user.id;

    // if there are any errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const task = new Task({
      title,
      description,
      due_date,
      status: status || "To Do", // default status
      priority: priority || "Medium", // default priority
      assigned_user: assigned_user,
      created_by,
    });

    // const created_by = req.user.id;

    const newTask = await task.save();
    res.status(201).json({ message: "Task created successfully", newTask });
  } catch (err) {
    res.status(500).json({ error: err, message: err.message });
  }
};

// update a task (by user itself or admin)
exports.updateTask = async (req, res) => {
  const { title, description, due_date, priority, status } = req.body;

  try {
    const newTask = {};
    if (title) {
      newTask.title = title;
    }
    if (description) {
      newTask.description = description;
    }
    if (due_date) {
      newTask.due_date = due_date || new Date(due_date);
    }

    if (priority) {
      newTask.priority = priority || "Medium";
    }
    if (status) {
      newTask.status = status || "To Do";
    }

    // Find the task to be updated and update it
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    //Allow only admins or task owners to update
    if (task.id.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({ message: "Permission denied!" });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: newTask },
      { new: true }
    );
    res.json({ message: "Task updated successfully", task });
  } catch (err) {
    res.status(500).json({ error: err, message: err.message });
  }
};

// delete a task (by user itself or admin)

exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    let task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    //Allow only admins or task owners to delete
    if (
      task.created_by.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Permission denied!" });
    }

    await task.remove();
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err, message: err.message });
  }
};

// Task summary report

exports.getTaskSummary = async (req, res) => {
  // Handle Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { status, assigned_user, priority, due_date, created_at, created_by } = req.query;

    // Ensure user is admin
    if (!req.user || req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Permission denied, Admin only!" });
    }

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    let filters = {};

    if (status) filters.status = status;
    if (assigned_user) filters.assigned_user = assigned_user;
    if (priority) filters.priority = priority;
    if (due_date) filters.due_date = { $gte: new Date(req.query.due_date) };

    const totalTasks = await Task.countDocuments(filters);

    // fetch tasks based on query
    // const tasks = await Task.find(filters).skip((page - 1)*limit).limit(limit).sort(created_at, -1);
    const tasks = await Task.find(filters)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ created_at: 1 });

    // Generate task based summary based on the fetched task
    res.json({
      currentPage: page,
      limit,
      totalTasks,
      totalPages: Math.ceil(totalTasks / limit),
      tasks: [tasks],
    });
  } catch (err) {
    res.status(500).json({ error: err, message: err.message });
  }
};
