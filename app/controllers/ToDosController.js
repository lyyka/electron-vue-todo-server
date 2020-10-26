const mongoose = require('mongoose')
const { ToDo } = require('../models/ToDo')
const User = require('../models/User')

class ToDosController {
    constructor(){
        this.index = this.index.bind(this)
        this.store = this.store.bind(this)
        this.update = this.update.bind(this)
    }

    async index(req, res){
        try {
            const user = await User.findById(req.user.id)
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
        const todo = new ToDo({
            body: req.body.body,
            due_date: req.body.due_date,
            completed: false,
        });

        try {
            const user = await User.findById(req.user.id)
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
            let update = await User.updateOne(
                {_id: req.user.id, 'todos._id': mongoose.Types.ObjectId(req.body._id)}, 
                {
                    "$set": {
                        "todos.$.body": req.body.body,
                        "todos.$.due_date": req.body.due_date,
                        "todos.$.completed": req.body.completed,
                    }
                }
            )
            return res.status(200).send({
                success: update !== null,
            })
        }
        catch(e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
}

module.exports = new ToDosController();