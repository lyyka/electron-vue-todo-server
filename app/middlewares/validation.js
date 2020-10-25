const { validationResult } = require('express-validator')

module.exports = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const es = {}

        // Convert array of errors to a better format
        errors.array().forEach(e => {
            es[e.param] = e.msg
        })
        
        return res.status(400).json({ errors: es })
    }
    next()
}