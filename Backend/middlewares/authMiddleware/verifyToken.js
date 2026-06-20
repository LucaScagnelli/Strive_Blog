const jwt = require('jsonwebtoken')
const authorService = require('../../modules/authors/authors.service.js')

const EXCLUDED_ROUTES = [
    "/login",
    '/auth/google',
    '/auth/google/callback',
    "/registration"
]

const verifyToken= async (req, res, next) => {
    try {

        if(EXCLUDED_ROUTES.includes(req.path)){
            return next()
        }

        const authHeader = req.headers.authorization
        const token = authHeader.split(" ")[1]

        if(!token){
            throw new Error("invalid or missing token")
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const currentUser = {
            name:decodedToken.name,
            id:decodedToken.id,
            email:decodedToken.email
        }
        //const currentUser = await authorService.getSingleAuthor(decodedToken.id)
        req.user = currentUser
        console.log(currentUser)
        next()

    } catch (error) {

        return res.status(401)
            .json({
                message:"invalid or missing token"
            })
    }

}

module.exports= verifyToken
