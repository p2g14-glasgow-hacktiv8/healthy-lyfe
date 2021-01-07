const express = require('express')
const router = express.Router()
const { authorization } = require('../middlewares/auth')
const RecipeController = require('../controllers/recipe-controller')

router.post('/', RecipeController.postRecipeHanlder)
router.get('/', RecipeController.getRecipes)
router.get('/:recipeId', authorization, RecipeController.getOneRecipe)
router.delete('/:recipeId', authorization, RecipeController.deleteTodoHandler)


module.exports = router