const { OAuth2Client } = require('google-auth-library')
const { User } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static postRegisterHandler(req, res, next) {
        const { name, email, password } = req.body

        User.create(req.body)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static postLoginHandler(req, res, next) {
        const { email, password } = req.body

        User.findOne({where: {
            email
        }})
            .then(data => {
                if(data && comparePassword(password, data.password)) {
                    let payload = {
                        id: data.id,
                        email: data.email
                    }
                    const access_token = generateToken(payload)
                    // console.log(access_token)
                    res.status(200).json({
                        access_token
                    })
                } else {
                    next({name: "invalid"})
                }
                
            })
            .catch(err => {
                next(err)
            })
    }
    
    static loginGoogle (req, res, next) {
        const { id_token } = req.body
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

        let email = ""

        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then (ticket => {
            const payload = ticket.getPayload()

            email = payload.email

            //setelah dapat email, kita cocokkan apakah di database User, email tersebut telah terdaftar atau tidak
            //jika belum, maka kita registrasikan lalu generate jwt
            //jika sudah, maka kita generate jwt
            //setelahnya kita kembalikan via res.status
            
            return User.findOne ({
                where: {
                    email
                }
            })
        })
        .then (result => {
            if (!result) {
                return User.create ({
                    email,
                    password: Math.floor(Math.random()*1000) + "PasswordRandom"

                })
            } else {
                return result
            }
        })
        .then (result => {
            const payload = {
                id: result.id,
                email: result.email
            }

            const access_token = generateToken(payload)

            return res.status (200).json ({
                access_token
            })
        })
        .catch (err => {
            console.log(err)
            next (err)
        })

    }
}

module.exports = UserController
