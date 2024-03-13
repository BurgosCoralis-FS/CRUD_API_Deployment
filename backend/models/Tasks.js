const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("Task", taskSchema)