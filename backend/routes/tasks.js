const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
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
        body('title', 'Enter a valid title').isLength({ min: 3 }).notEmpty().withMessage('Title is required'),
        body('description', 'Description must be atleast 5 charcters').isLength({ min: 5 }).notEmpty().withMessage('Description is required'),
        body('due_date').isISO8601().notEmpty().withMessage('Due date is required'),
        body('status').optional()
            .isIn(['To Do', 'In Progress', 'Completed'])
            .withMessage('Status must be one of To Do, In Progress, Completed')
            .default('To Do'), // Default value of status
        body('priority').optional()
            .isIn(['Low', 'Medium', 'High'])
            .withMessage('Priority must be one of the Low, Medium, High')
            .default('Medium'),
        body('assigned_user._id').isMongoId().notEmpty().withMessage('Assigned users id must be a valid user Id!'),
        body('assigned_user.name').notEmpty().withMessage('Assigned users name must be a valid user Id!'),

    ],
    taskController.createTask
)

// update Task by user_id (user or admin)
// POST: "api/tasks/updatetask/:id"
router.put('/updatetask/:id',
    [
        authUser,
        authAdmin,
        body('title', 'Enter a valid title').isLength({ min: 3 }).notEmpty().withMessage('Title is required'),
        body('description', 'Description must be atleast 5 charcters').isLength({ min: 5 }).notEmpty().withMessage('Description is required'),
        body('due_date').isISO8601().optional(),
        body('status').isIn(['To Do', 'In Progress', 'Completed']).default('To Do').optional(),
        body('priority').isIn(['Low', 'Medium', 'High']).default('Medium').optional(),
    ],
    taskController.updateTask)

// delete Task by user_id (user or admin)
router.delete('/deletetask/:id', authUser, authAdmin, taskController.deleteTask)

// get Task by user_id (user or admin)
router.get('/getalltasks', authUser, authAdmin, [
    query('status').optional().isIn(['To Do', 'In Progress', 'Completed']).withMessage('Invalid status value'),
    query('user').optional().isMongoId().withMessage('Invalid user ID'),
    query('startDate').optional().isISO8601().withMessage('Start date must be a valid date'),
    query('endDate').optional().isISO8601().withMessage('End date must be a valid date'),
    query('page').optional().isInt({ min: 1 }).withMessage('Page number must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer')
], taskController.getTasks)

router.get('/tasksummary', [authUser, authAdmin], taskController.getTaskSummary)

module.exports = router;