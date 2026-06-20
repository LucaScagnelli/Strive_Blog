const express = require('express')
const authControllers = require('./auth.controllers.js')
const authRouter=express.Router()

authRouter.post('/login', authControllers.login)

module.exports=authRouter