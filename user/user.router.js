const express = require('express');
const router = express.Router();
const userController = require('./user.controller');


// Реєстрація
router.post('/signup', userController.signup_controller);

// Логін
router.post('/login', userController.login_controller);

module.exports = router;