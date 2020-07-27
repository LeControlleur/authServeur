const db = require("../models")
const HttpStatus = require("../HttpStatus")
const fs = require("fs")

const User = db.connexion

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const EXPIRES_IN_MINUTES = '1440m'

const PRIVATE_KEY = fs.readFileSync('privateKey.perm')





module.exports = {



    insertUser: (req, res) => {
        const body = req.body

        if (!body) {
            return res.status(HttpStatus.unauthorized).json({
                success: false,
                error: "You must provide an admin"
            })
        }

        User.findAll({
            where: {
                login: body.login
            }
        })
            .then((docs) => {

                if (docs && docs.length) {
                    return res
                        .status(HttpStatus.badRequest)
                        .json({
                            success: false,
                            error: "User already exist"
                        })
                }
                else {
                    const user = new User(body)

                    console.log(user)

                    user.save()
                        .then(() => {
                            res.status(HttpStatus.created).json({
                                success: true,
                                id: user.idconnexion,
                                message: "User created"
                            })
                        })
                        .catch(error => {
                            console.log(error)
                            res.status(HttpStatus.badRequest).json({
                                success: false,
                                error,
                                message: "User not created"
                            })
                        })
                }
            })
            .catch((err) => {
                return res
                    .status(HttpStatus.badRequest)
                    .json({
                        success: false,
                        error: err
                    })
            })

    },





    authenticate: (req, res) => {

        console.log("Ehhhh")
        //  console.log(req.body)
        const login = req.body.login
        const password = req.body.password

        User.findOne({
            where: {
                login: login
            }
        })
            .then((user) => {

                //  console.log(user)
                
                if (!user) {
                    return res.status(HttpStatus.notFound).json({
                        success: false,
                        error: 'login not found',
                    })
                }

                bcrypt.compare(password, user.mot_de_passe, function (err, result) {
                    if (result === true) {
                        console.log("C'est bon")
                        const { Agent_production_id, commercial_id } = user
                        const payload = { 
                            login: user.login, 
                            Agent_production_id, 
                            commercial_id 
                        }
                        
                        const token = jwt.sign(payload, PRIVATE_KEY, {
                            expiresIn: EXPIRES_IN_MINUTES,
                            algorithm: "RS512"
                        })

                        user.mot_de_passe = undefined
                        user.login = undefined

                        //  console.log(user)


                        return res.status(HttpStatus.OK).json({
                            success: true,
                            user,
                            token,
                            message: "user authenticated!",
                        })

                    } else {
                        console.log("Pas bon")
                        return res.status(HttpStatus.notAcceptable).json({
                            success: false,
                            error: "Password doesn't match"
                        })
                    }
                })
            })
            .catch((err) => {

                console.error(err);

                return res
                    .status(HttpStatus.badRequest)
                    .json({
                        success: false,
                        error: err
                    })
            })
    },



    getData: (req, res) => {
        console.log(req.body)
    },


    updateUserPassword: (req, res) => {
        const body = req.body

        if (!body) {
            return res.status(HttpStatus.unauthorized).json({
                success: false,
                error: "You must provide an admin"
            })
        }


        User.findOne({
            where: {
                login: body.login
            }
        })
            .then((user) => {

                user.update({
                    logged: '1',
                    mot_de_passe: req.body.password
                })
                    .then(function () {
                        return res.status(HttpStatus.created).json({
                            success: true,
                            login: body.login,
                            message: "User updated"
                        })
                    })
                    .catch(error => {
                        console.log(error)

                        return res.status(HttpStatus.badRequest).json({
                            success: false,
                            error,
                            message: "User not updated"
                        })

                    })

            })
            .catch((err) => {

                console.error(err);

                return res
                    .status(HttpStatus.badRequest)
                    .json({
                        success: false,
                        error: err
                    })
            })



    },


}