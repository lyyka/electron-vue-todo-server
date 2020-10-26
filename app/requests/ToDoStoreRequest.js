const { body } = require('express-validator')

module.exports = [
    body('body').isString().notEmpty(),
    body('due_date').optional({checkFalsy: true}).isISO8601().toDate(),
    body('completed').isBoolean().optional(),
]