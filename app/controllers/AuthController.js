class AuthController {
    constructor(){
        this.User = require('../models/User')
        this.bcrypt = require('bcrypt')
        this.jwt = require('jsonwebtoken')

        this.validationResult = require('express-validator').validationResult
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
    }

    async login(req, res){
        const user = await this.User.findOne({'email': req.body.email})
        if(user){
            const compared = this.bcrypt.compareSync(req.body.password, user.password)
            if(compared){
                const jwtPayload = {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    updated_at: user.updated_at,
                }
                const token = this.jwt.sign(jwtPayload, process.env.JWT_SECRET, {
                    expiresIn: '24 hours'
                })
                return res.status(201).send({
                    jwt: token,
                })
            }
        }
        return res.status(401).send({
            errors: {
                'email': 'Incorrect credentials'
            }
        })
    }

    async register(req, res){
        const user = new this.User({
            name: req.body.name,
            email: req.body.email,
            password: this.bcrypt.hashSync(req.body.password, 10)
        })
        const saved = await user.save()
        res.status(200).send({
            success: saved,
        })
    }
}

module.exports = new AuthController();