const express = require("express");
const router = express.Router();
const controller = require('../controllers/ToDosController')

// Requests
const ToDoStoreRequest = require('../requests/ToDoStoreRequest')

router.get("/", controller.index)
router.post("/", ToDoStoreRequest, controller.store)
router.put('/update', ToDoStoreRequest, controller.update)

module.exports = router