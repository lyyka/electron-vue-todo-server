const express = require("express");
const router = express.Router();
const controller = require('../controllers/AuthController')

// Middlewares
const hasValidation = require('../middlewares/validation')

// Requests
const LogInRequest = require('../requests/LogInRequest')
const RegisterRequest = require('../requests/RegisterRequest')

// Auth Routes
router.post("/login", [LogInRequest, hasValidation], controller.login)
router.post("/register", [RegisterRequest, hasValidation], controller.register)

module.exports = router