const { validationResult } = require("express-validator");
const Task = require("../models/Task");

// Get all tasks (admin or user can view)
// Need to be work
exports.getTasks = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), stack: errors.stack });
  }

  try {
    
    let tasks = [];
    let totalTasks = 0;

    // check if user is an admin, fetch all tasks
    if (req.user.role === "admin") {
      tasks = await Task.find().populate('created_by', 'name').populate('assigned_user', 'name');
      totalTasks = await Task.countDocuments();
    }

    // if user is not admin, fetch only their tasks
    else{
      tasks = await Task.find(
        { "assigned_user._id": req.user._id }
      )
      totalTasks = await Task.countDocuments({ "assigned_user._id": req.user._id });
    }  
    
    // If no tasks found
    if (!tasks) return res.status(404).json({ message: "Tasks not found" });

    // Pagination parameters from query
    /*let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    console.log(page, limit);*/

    /*let filters = {};*/

    res.json({totalTasks, tasks});
  } catch (error) {
    res.status(500).json({ error: error, message: error.message });
  }
};

// Create a Task (only admin can assign)
exports.createTask = async (req, res) => {
  try {
    const { title, description, due_date, status, priority, assigned_user } = req.body;

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
      assigned_user: {
        _id: assigned_user._id,
        name: assigned_user.name
      },
      created_by: {
        _id: req.user._id,
        name: req.user.name,
      },
    });

    const newTask = await task.save();

    newTask.save();

    res.status(201).json({ message: "Task created successfully", newTask });
  } catch (err) {
    res.status(500).json({ error: err, message: err.message });
    console.log(err.stack)
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
    const taskId = req.params.id;
    let task = await Task.findOne({ _id: taskId });
    if (!task) return res.status(404).json({ message: "Task not found" });

    //Allow only admins or task owners to update
    if (task.created_by.toString() !== req.user.id.toString() && req.user.role !== "admin") {
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
    if (task.created_by.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Permission denied! Admin or Task owners only" });
    }

    task = await Task.findByIdAndDelete(taskId);
    res.json({ message: "Task deleted successfully", task: task });
  } catch (err) {
    res.status(500).json({ error: err, message: err.message });
  }
};

// Task summary report
exports.getTaskSummary = async (req, res) => {
  // Handle Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }

  try {
    const {
      // assigned_user,
      status,
      priority,
      due_date
    } = req.query;

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
    if (priority) filters.priority = priority;
    // if (assigned_user) filters.assigned_user._id = _id ; /* filter disabled. needs to work */
    if (due_date) filters.due_date = { $gte: new Date(req.query.due_date) };
    // console.log(filters, filters.assigned_user); // for debuging

    // fetch task summary based on filters
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({status: "Completed"});
    const inProgressTasks = await Task.countDocuments({
      status: "In Progress"
    });
    const toDoTasks = await Task.countDocuments({status: "To Do"});

    // fetch tasks based on query
    const tasks = await Task.find(filters)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ created_at: -1, due_date: -1 });

    if(totalTasks === 0){
      return res.status(404).json({ message: 'No tasks found for the given users' });
    }


    // Generate task based summary based on the fetched task
    res.json({
      message: "Task summary retrived successfully",
      summary: {
        totalTasks: totalTasks,
        completed: completedTasks,
        inProgress: inProgressTasks,
        toDo: toDoTasks,
        currentPage: page,
        limit: limit,
        tasks: tasks
      },
      // tasks: tasks
    });
  } catch (err) {
    res.status(500).json({ error: err, message: err.message });
  }
};
