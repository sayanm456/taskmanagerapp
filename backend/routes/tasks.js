const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const taskController = require('../controllers/taskController');
const { authUser } = require('../middleware/authUser');
const { authAdmin } = require('../middleware/authAdmin');

// Create Task (user or admin)
router.post(
    '/addtask',
    authUser, authAdmin,
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('due_date').isDate(new Date()).notEmpty().withMessage('Due date is required'),
        body('status').notEmpty().withMessage('Status is required'),
        body('priority').isIn(['Low', 'Medium', 'High']).notEmpty().withMessage('Priority is required'),
        body('assigned_user').notEmpty().withMessage('Assigned to is required'),
    ],
    taskController.createTask
)

// update Task by user_id (user or admin)
router.put('/updatetask/:id', authUser, authAdmin, taskController.updateTask)

// delete Task by user_id (user or admin)
router.delete('/deletetask/:id', authUser, authAdmin, taskController.deleteTask)

// get Task by user_id (user or admin)
router.get('/getalltasks:id', authUser, authAdmin, taskController.getTasks)

router.get('/tasksummary', authUser, authAdmin, taskController.getTaskSummary)

module.exports = router;