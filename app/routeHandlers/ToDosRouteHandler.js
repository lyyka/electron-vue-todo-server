const express = require("express");
const router = express.Router();
const controller = require('../controllers/ToDosController')

// Middlewares
const hasValidation = require('../middlewares/validation')
const auth = require('../middlewares/auth')

// Requests
const ToDoStoreRequest = require('../requests/ToDoStoreRequest')

// To-Dos Routes
router.get("/", [auth], controller.index)
router.post("/", [ToDoStoreRequest, hasValidation, auth], controller.store)
router.put('/update', [ToDoStoreRequest, hasValidation, auth], controller.update)

module.exports = router