const express = require('express')
const initServer=require('./config/db.js')
const cors = require ('cors')
require('dotenv').config()

//route imports

const authorsRouter=require('./modules/authors/authors.route.js')
const postsRouter=require('./modules/posts/posts.route.js')
const authRouter=require('./modules/auth/auth.route.js')
const oauthGoogleRouter=require('./modules/oauth/oauth.google.route.js')

//middleware imports

const verifyToken = require('./middlewares/authMiddleware/verifyToken.js')
const errorHandler = require('./middlewares/errorMiddleware/errorHandler.js')

//port and server

const PORT = 9009
const server = express()


server.use(express.json())
server.use(cors())

server.use(verifyToken)

server.use('/', authRouter)
server.use('/authors', authorsRouter)
server.use('/blogPosts', postsRouter)
server.use('/', oauthGoogleRouter)

server.use(errorHandler)


initServer(PORT,server)
