const express = require('express')
const router = express.Router()
const { authorization } = require('../middlewares/auth')
const RecipeController = require('../controllers/recipe-controller')

router.post('/', RecipeController.postRecipeHanlder)
router.get('/', RecipeController.getRecipes)
router.get('/search', RecipeController.searchRecipes)
router.get('/random', RecipeController.randomRecipes)
router.get('/:recipeId', authorization, RecipeController.getOneRecipe)
router.delete('/:recipeId', authorization, RecipeController.deleteRecipeHandler)


module.exports = router
