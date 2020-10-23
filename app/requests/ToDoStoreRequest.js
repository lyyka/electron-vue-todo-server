const { body } = require('express-validator')

module.exports = [
    body('body').isString().notEmpty(),
    // body('due_date').isDate().optional(),
]