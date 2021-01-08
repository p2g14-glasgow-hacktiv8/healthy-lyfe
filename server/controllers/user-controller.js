const { OAuth2Client } = require('google-auth-library')
const { User } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')
const axios = require('axios').default;

class UserController {
    static postRegisterHandler(req, res, next) {
        let { name, email, password } = req.body
        User.create({name, email, password})
            .then(data => {
                let { id, email } = data
                res.status(201).json({ id, email })
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
                    req.headers.access_token = access_token
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

    static postBMI (req, res, next) {
        const { height, weight } = req.body
        const baseUrl = 'https://fitness-api.p.rapidapi.com/fitness'
        const data = {
            height: height,
            weight: weight,
            age: age,
            gender: gender,
          }

        var options = {
            headers: {
                'x-rapidapi-key': process.env.FITNESS_API_KEY,
                'x-rapidapi-host': 'fitness-api.p.rapidapi.com'
            },
        };
          
        axios.post(baseUrl, data, options).then(function (response) {
            res.status(200).json(response.data.bodyMassIndex)
        }).catch(function (error) {
            next(err)
        });
    }
}

module.exports = UserController
