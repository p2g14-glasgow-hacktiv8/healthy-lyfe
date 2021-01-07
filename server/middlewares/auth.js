const { checkToken } = require('../helpers/jwt')
const {  User } = require('../models')

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
    }
    catch (err) {
        next(err)
    }
}

function authorization(req, res, next) {

    Todo.findOne({where: {
        id: req.params.id
    }})
        .then(data => {
            console.log(data)
            if(!data) {
                next({name: "Not Authorized"})
            } else {
                next()
            }
        })
        .catch(err => {
            next(err)
        })
    

}

module.exports = {
    authentication,
    authorization
}