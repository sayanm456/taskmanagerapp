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
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true

        },
        name: {
            type: String,
            required: true
        }
    },
    created_by: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
}, { timestamps: true }
);

mongoose.models = {}
module.exports = mongoose.model('Task', TasksSchema);