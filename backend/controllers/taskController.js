const { validationResult } = require('express-validator');
const Task = require('../models/Task');
const { query } = require('express');

// Get all tasks (admin or user can view)
exports.getTasks = async (req, res) => {
    const { page = 1, limit = 10, status, priority, assigned_user } = req.query;
    const filters = { created_by: req.user._id }; // Non-admin can see their own tasks
  
    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (req.user.role === 'admin' && assigned_user) filters.assigned_user = assigned_user;
  
    try {
      const tasks = await Task.find(filters)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
  
      const count = await Task.countDocuments(filters);
      res.json({
        tasks,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// Create a Task (only admin can assign)
exports.createTask = async (req, res) => {

    try {
        const { title, description, due_date, status, priority, assigned_user } = req.body;

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
            status: status || 'To Do', // default status
            priority: priority || 'Medium', // default priority
            assigned_user: assigned_user,
            created_by,
        })

        // const created_by = req.user.id;

        const newTask = await task.save();
        res.status(201).json({message: 'Task created successfully', newTask });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err, message: err.message });
    }
    
}

// update a task (by user itself or admin)
exports.updateTask = async (req, res) => {
    const taskId = req.params.id;
    const { title, description, due_date, priority, status, assigned_user, created_by } = req.body

    try {
        const newTask = {};
        if(title){ newTask.title = title };
        if(description){ newTask.description = description };
        if(due_date){ newTask.due_date = due_date };
        if(priority){ newTask.priority = priority };
        if(status){ newTask.status = status };
        if(assigned_user){ newTask.assigned_user = assigned_user };
        if(created_by){ newTask.created_by = created_by };

        // Find the task to be updated and update it
        let task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        //Allow only admins or task owners to update
        if (task.created_by.toString() !== req.user._id.toString() && req.user.role!== 'admin') {
            return res.status(403).json({ message: 'Permission denied!' });
        }

        task = await Task.findByIdAndUpdate(taskId, { $set: newTask}, { new: true })
        res.json({ message: 'Task updated successfully', task });
    } catch (err) {
        res.status(500).json({error: err, message: err.message})
    }
    
};

// delete a task (by user itself or admin)

exports.deleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        let task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        //Allow only admins or task owners to delete
        if (task.created_by.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Permission denied!' });
        }

        await task.remove();
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err, message: err.message });
    }
};

// Task summary report

exports.getTaskSummary = async (req, res) => {
    const { status, assigned_user, priority } = req.query;
    query = {};

    if(status) query.status = status;
    if(assigned_user) query.assigned_user = assigned_user;
    if(priority) query.priority = priority;

    try {
        const tasks = await Task.find(query);
        res.json({ tasks })
        
    } catch (err) {
        res.status(500).json({ error: err, message: err.message });
    }
};