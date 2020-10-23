// Transfer env vars to process.env
const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

// Config the app
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use(require('cors')())
app.use('/api/todos', require('./app/routeHandlers/ToDosRouteHandler'))

// Start the server
app.listen(process.env.PORT, () => { 
    console.log(`Server listening on port ${process.env.PORT}`)
})