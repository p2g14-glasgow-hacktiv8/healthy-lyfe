const express = require('express')
const router = express.Router()
const recipeRouter = require('./recipeRoutes')
const userRouter = require('./userRoutes')
const { authentication } = require('../middlewares/auth')

router.use(userRouter)
router.use(authentication)
router.use('/recipes', recipeRouter)

module.exports = router