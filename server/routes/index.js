const express = require('express')
const router = express.Router()
const recipesRouter = require('./recipesRoutes')
const userRouter = require('./userRoutes')
const { authentication } = require('../middlewares/auth')

router.use(userRouter)
router.use(authentication)

module.exports = router