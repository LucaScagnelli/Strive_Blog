const mongoose=require("mongoose")

const author=require('./authors.schema.js')
const post = require('../posts/posts.schema.js')

const getAllAuthors = async (page=1,limit=5)=>{
    const skip = (page-1)*limit
    const allAuthors= await author.find().limit(limit).skip(skip).populate("posts")
    const totalAuthors= await author.countDocuments()
    const totalPages= Math.ceil(totalAuthors/limit)
    
    return{
        data:allAuthors,
        page,
        limit,
        totalAuthors:totalAuthors,
        totalPages:totalPages
    }
}

const getSingleAuthor = async (id)=>{
    return author.findById(id)
}

const getAuthorByEmail = async (email)=>{
    return author.findOne({email})
}

const getAuthorByEmailAndPassword = async (email)=>{
    return author.findOne({email}).select("+password")
}

const getPostsPerAuthor = async (id)=>{
    return post.find({author:id})

}

const createAuthor = async (newAuthorData)=>{
    const newAuthor= new author(newAuthorData)
    return await newAuthor.save()
}

const deleteAuthor = async (id)=>{
    return author.findByIdAndDelete(id)
}

const modifyAuthor = async (id,newData)=>{
    return author.findByIdAndUpdate(id,newData,{returnDocument: 'after'})
}

module.exports={
    getAllAuthors,
    getSingleAuthor,
    createAuthor,
    deleteAuthor,
    modifyAuthor,
    getPostsPerAuthor,
    getAuthorByEmail,
    getAuthorByEmailAndPassword
}