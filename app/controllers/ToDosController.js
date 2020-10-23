class ToDosController {
    constructor(){
        this.ToDo = require('../models/ToDo')
        this.validationResult = require('express-validator').validationResult
        this.index = this.index.bind(this)
        this.store = this.store.bind(this)
        this.update = this.update.bind(this)
    }

    index(req, res){
        try {
            this.ToDo.find(function(err, todos){
                if(err){
                    res.status(505).send([])
                }
                else{
                    res.status(200).send(todos)
                }
            })
            res.send("Hooray!")
        } catch(e){
            res.send(e)
        }
    }

    store(req, res){
        const errors = this.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const todo = new this.ToDo({
            body: req.body.body,
            due_date: req.body.due_date,
            completed: false,
        });

        todo.save(function(err) {
            if(err) {
                res.status(505).send({
                    success: false,
                })
            } else {
                res.status(200).send({
                    success: true
                })
            }
        })
    }

    async update(req, res){
        const errors = this.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        let todo = await this.ToDo.findById(req.body._id);
        if(todo !== undefined){
            todo.body = req.body.body
            todo.due_date = req.body.due_date
            todo.completed = req.body.completed

            const saved = await todo.save()
            res.status(200).send({
                success: saved,
            })
        }
        else{
            res.status(500).send({
                success: false,
            })
        }
    }
}

module.exports = new ToDosController();