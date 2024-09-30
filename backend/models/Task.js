// eslint-disable-next-line no-undef
const mongoose = require('mongoose');
const { Schema } = mongoose;

const TasksSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Completed'],
        default: 'To Do'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    assigned_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
  },{ timestamps: true }
);

// eslint-disable-next-line no-undef
module.exports = mongoose.model('Task', TasksSchema);