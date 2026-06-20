const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authorService = require('../authors/authors.service.js')

const login = async (email,password)=>{

    const foundAuthor = await authorService.getAuthorByEmailAndPassword(email)

    if(!foundAuthor){
        throw new Error("credentials are not valid")
    }

    const isMatchingPassword = await bcrypt.compare(password,foundAuthor.password)

    if(!isMatchingPassword){
        throw new Error("credentials are not valid")
    }
    const token = jwt.sign({
        name:foundAuthor.name,
        id:foundAuthor._id,
        email:foundAuthor.email
    },process.env.JWT_SECRET,{
        expiresIn:"1h"
    })
    return {
        token
    }
}

module.exports={login}