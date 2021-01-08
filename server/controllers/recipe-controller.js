const { Recipe } = require('../models')
const { checkToken } = require('../helpers/jwt')
const axios = require('axios')


class RecipeController {

    static postRecipeHanlder(req, res, next) {
        let { foodName, recipes, url } = req.body
        let verifiedToken = checkToken(req.headers.access_token)
        let UserId = verifiedToken.id

        Recipe.create({ foodName, recipes, url, UserId})
        .then((recipe) => {
            res.status(201).json(recipe)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static deleteTodoHandler(req, res, next) {
        let { recipeId } = req.params

        Recipe.findByPk(recipeId)
        .then(recipe => {
            if (recipe) {
                return Recipe.destroy({where: {id: recipeId}})
            } else {
                throw ({name: 'notFound'})
            }
        })
        .then(() => {
            res.status(200).json({message: `recipe by id ${recipeId} has been deleted`})
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static getRecipes (req, res, next) {
        try {
            let verifiedToken = checkToken(req.headers.access_token)
            let userId = verifiedToken.id

            Recipe.findAll({where: {UserId: userId}})
            .then(recipes => {
            if (recipes) {
                res.status(200).json(recipes)
            } else {
                throw ({name: 'notFound'})
            }
        })
        } catch (err) {
            next(err)
        }
    }

    static getOneRecipe (req, res, next) {
        let id = req.params.recipeId
        
        Recipe.findOne({where: {id: id}})
        .then(recipe => {
        if (recipe) {
            res.status(200).json(recipe)
        } else {
            throw ({name: 'notFound'})
        }
        })
        .catch(err => {
            next(err)
        })
    }
    
    static searchRecipes(req, res, next) {
        const baseUrl = "https://api.spoonacular.com/recipes/complexSearch";
        const option = {
            params: {
                apiKey: process.env.API_KEY,
                query: req.body.recipe,
                addRecipeInformation: true,
                number: 10
            }
        }

        axios.get(baseUrl, option)
            .then(response => {

                const recipes = response.data.results.map(recipe => {
                    return {
                        title: recipe.title,
                        sourceUrl: recipe.sourceUrl,
                        image: recipe.image
                    }
                })

                res.status(200).json(recipes)
            })
            .catch(err => {
                next(err)
            })
    }

    static randomRecipes(req, res, next) {
        const baseUrl = "https://api.spoonacular.com/recipes/random";
        const option = {
            params: {
                apiKey: process.env.API_KEY,
                number: 5
            }
        }

        axios.get(baseUrl, option)
            .then(response => {

                const recipes = response.data.recipes.map(recipe => {
                    return {
                        title: recipe.title,
                        sourceUrl: recipe.sourceUrl,
                        image: recipe.image
                    }
                })

                res.status(200).json(recipes)
            })
            .catch(err => {
                next(err)
            })
    }
    
}

module.exports = RecipeController
