class ToDosController {
    constructor(){
        this.ToDo = require('../models/ToDo').ToDo
        this.User = require('../models/User')
        this.validationResult = require('express-validator').validationResult
        this.index = this.index.bind(this)
        this.store = this.store.bind(this)
        this.update = this.update.bind(this)
    }

    async index(req, res){
        try {
            const user = await this.User.findById(req.user.id)
            if(user !== null){
                return res.status(200).send(user.todos)
            }
            else{
                return res.status(200).send([])
            }
        } catch(e){
            res.status(500).send([])
        }
    }

    async store(req, res){
        const todo = new this.ToDo({
            body: req.body.body,
            due_date: req.body.due_date,
            completed: false,
        });

        try {
            const user = await this.User.findById(req.user.id)
            if(user !== null){
                user.todos.push(todo)
                user.save()
                return res.status(201).send({
                    success: true,
                })
            }

            res.status(200).send({
                success: false,
            })
        }
        catch(e) {
            res.sendStatus(500)
        }
    }

    async update(req, res){
        try{
            let todo = await this.ToDo.findById(req.body._id);
            if(todo){
                todo.body = req.body.body
                todo.due_date = req.body.due_date
                todo.completed = req.body.completed

                const saved = await todo.save()
                res.status(200).send({
                    success: saved !== null,
                })
            }
            else{
                res.status(500).send({
                    success: false,
                })
            }
        }
        catch(e) {
            res.sendStatus(500)
        }
    }
}

module.exports = new ToDosController();