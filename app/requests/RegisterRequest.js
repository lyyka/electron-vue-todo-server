const { check } = require('express-validator')

module.exports = [
    check('name').trim().isString().notEmpty(),
    check('email').normalizeEmail().isEmail().notEmpty(),
    check('password').trim().isString().notEmpty(),
]