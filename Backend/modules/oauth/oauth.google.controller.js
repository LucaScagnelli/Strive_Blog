const { json } = require('express')
const jwt = require('jsonwebtoken')
const authorsService=require('../authors/authors.service')
const author = require('../authors/authors.schema')

const oauthGoogle = (req,res,next)=>{
    try {
        const user = encodeURIComponent(JSON.stringify(req.user))
        const redirectUrl = `${process.env.BASE_FRONTEND_URL}/oauth/success?user=${user}`

        res.redirect(redirectUrl)

    } catch (error) {
        next(error)
    }
}

const manageOauthGoogleCallback = async (req,res,next)=>{
    try {
        const user= req.user
        
        const newUser ={
            name:user.name.givenName,
            lastname:user.name.familyName,
            email:user.emails[0].value,
            googleId:user.id,
            avatar:user.photos[0].value,
        }
        console.log(newUser)

        const userToFind = await authorsService.getAuthorByEmail(newUser.email)

        if(!userToFind){
            await authorsService.createAuthor(newUser)
        }
        
        
        const token = jwt.sign({
            name:user.name.givenName,
            id: user.id,
            email: user.emails[0].value
        },process.env.JWT_SECRET)
        const redirectUrl = `${process.env.BASE_FRONTEND_URL}/oauth/success?token=${token}`

        res.redirect(redirectUrl)

    } catch (error) {
        next(error)
    }
}

module.exports={
    oauthGoogle,
    manageOauthGoogleCallback
}
