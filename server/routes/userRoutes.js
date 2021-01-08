const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user-controller')

router.post('/register', UserController.postRegisterHandler)
router.post('/login', UserController.postLoginHandler)
router.post('/loginGoogle', UserController.loginGoogle)
//router.get('/tes', UserController.userHandler)


module.exports = router