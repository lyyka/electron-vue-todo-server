const mongoose = require('mongoose')
const { Schema } = mongoose

const toDoSchema = new Schema({
    body: String,
    due_date: Date,
    completed: Boolean,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

module.exports = {
    ToDoSchema: toDoSchema,
    ToDo: mongoose.model('ToDo', toDoSchema)
}