const { checkToken } = require('../helpers/jwt')
const {  User, Recipe } = require('../models')

async function authentication(req, res, next) {
    try {
        let decoded = checkToken(req.headers.access_token)
        let find = await User.findOne({where: { email: decoded.email}})
        if(!find) {
            next({name: "Not Authenticated"})
        } else {
            req.user = find
            next()
        }
    } catch (err) {
        next(err)
    }
}

function authorization(req, res, next) {
    try {
        let verifiedToken = checkToken(req.headers.access_token)
        let userId = verifiedToken.id

        Recipe.findOne({where: {
            id: req.params.recipeId
        }})
        .then(data => {
            if(!data) {
                next({name: "notFound"})
            } else {
                if (data.UserId == userId) {
                    next()
                } else {
                    next({name: "Not Authorized"})
                }
            }
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    authentication,
    authorization
}