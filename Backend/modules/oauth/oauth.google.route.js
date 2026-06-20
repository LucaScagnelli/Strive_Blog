const express = require('express')
const passport = require('passport')
const session = require('express-session')
const oauthGoogle = express.Router()
const googleStrategy = require('passport-google-oauth20').Strategy
const oauthGoogleController = require('./oauth.google.controller')

oauthGoogle.use(session({
    secret:process.env.OAUTH_GOOGLE_SECRET,
    resave:false,
    saveUninitialized:false
}))

oauthGoogle.use(passport.initialize())
oauthGoogle.use(passport.session())

passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})

passport.use(new googleStrategy({

    clientID:process.env.OAUTH_GOOGLE_CLIENT_ID,
    clientSecret:process.env.OAUTH_GOOGLE_SECRET,
    callbackURL:process.env.OAUTH_GOOGLE_CALLBACK_URL

},(accessToken,refreshToken,profile,done)=>{
    done(null,profile)
}))

oauthGoogle.get('/auth/google', passport.authenticate('google',{scope:['profile','email']}), oauthGoogleController.oauthGoogle)
oauthGoogle.get('/auth/google/callback', passport.authenticate('google',{failureRedirect:'/login'}), oauthGoogleController.manageOauthGoogleCallback)

module.exports= oauthGoogle
