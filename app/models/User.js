const mongoose = require('mongoose')
const { Schema } = mongoose
const { ToDoSchema } = require('./ToDo')

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    todos: [ToDoSchema],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)