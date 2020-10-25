const { check } = require('express-validator')

module.exports = [
    check('email').normalizeEmail().isEmail().notEmpty(),
    check('password').isString().notEmpty(),
]