const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const taskController = require('../controllers/taskController');
const { authUser, authAdmin } = require('../middleware/authUser');

// Create Task (admin or admins only)
// POST: "api/tasks/createtask"
router.post(
    '/createtask',
    [
        authUser,
        authAdmin,
        // Validation Middleware
        body('title', 'Enter a valid title').isLength({ min: 3}).notEmpty().withMessage('Title is required'),
        body('description', 'Description must be atleast 5 charcters').isLength({ min: 5}).notEmpty().withMessage('Description is required'),
        body('due_date').isISO8601().notEmpty().withMessage('Due date is required'),
        body('status').optional()
                      .isIn(['To Do', 'In Progress', 'Completed'])
                      .withMessage('Status must be one of To Do, In Progress, Completed')
                      .default('To Do'), // Default value of status
        body('priority').optional()
                        .isIn(['Low', 'Medium', 'High'])
                        .withMessage('Priority must be one of the Low, Medium, High')
                        .default('Medium'),
        body('assigned_user').isMongoId().notEmpty().withMessage('Assigned user must be a valid user Id!'),
    ],
    taskController.createTask
)

// update Task by user_id (user or admin)
// PUT: "api/tasks/updatetask"
router.put('/updatetask/:id', 
    [
        authUser, 
        authAdmin,
        body('title', 'Enter a valid title').isLength({ min: 3}).notEmpty().withMessage('Title is required'),
        body('description', 'Description must be atleast 5 charcters').isLength({ min: 5}).notEmpty().withMessage('Description is required'),
        body('due_date').isISO8601().notEmpty().withMessage('Due date is required'),
        body('status').isIn(['To Do', 'In Progress', 'Completed']).default('To Do').notEmpty().withMessage('Status is required'),
        body('priority').isIn(['Low', 'Medium', 'High']).default('Medium').notEmpty().withMessage('Priority is required'),
    ], 
    taskController.updateTask)

// delete Task by user_id (user or admin)
router.delete('/deletetask/:id', authUser, authAdmin, taskController.deleteTask)

// get Task by user_id (user or admin)
router.get('/getalltasks:id', authUser, authAdmin, taskController.getTasks)

router.get('/tasksummary', authUser, authAdmin, taskController.getTaskSummary)

module.exports = router;