const express=require("express")

const authorsService=require('./authors.service.js')

const getAllAuthors=async(req,res,next)=>{
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5

    try {
        const authors= await authorsService.getAllAuthors(page,limit)
        res.status(200)
            .json(authors)
        
    } catch (error) {
        next(error)
    }
}

const getSingleAuthor=async(req,res,next)=>{
    try {
        const singleAuthor= await authorsService.getSingleAuthor(req.params.id)
        res.status(201)
            .json(singleAuthor)
        
    } catch (error) {
        next(error)
    }
}

const getPostsPerAuthor= async (req,res,next)=>{
    try {
        const authorPosts = await authorsService.getPostsPerAuthor(req.params.id)
        res.status(200)
            .json({
                statusCode:200,
                authorPosts
            })
    } catch (error) {
        next(error)
    }
}

const postAuthor = async (req,res,next)=>{
    try {
        const newAuthor =await authorsService.createAuthor(req.body)
        const authorRes=newAuthor.toObject()
        delete authorRes.password
        res.status(201)
            .json(authorRes)
    } catch (error) {
        next(error)
    }
}

const deleteAuthor = async (req,res,next)=>{
    try {
        const deletedAuthor = await authorsService.deleteAuthor(req.params.id)
        if(!deletedAuthor){
            res.status(404)
                .send("Author not found")
        }
        res.status(200)
            .send(deletedAuthor)
    } catch (error) {
        next(error)
    }
}

const patchAuthor = async (req,res,next)=>{
    try {
        const updatedAuthor=await authorsService.modifyAuthor(req.params.id,req.body)
        res.status(200)
            .send(updatedAuthor)
    } catch (error) {
        next(error)
    }
}

const cloudFileUpload = async (req,res,next)=>{

    try {

        if(!req.file){
        return res.status(400)
            .json({
                stautsCode:400,
                message: "file non ricevuto"
            })
    }

    return res.status(200)
        .json({
            statusCode:200,
            img:req.file.path
        })

    } catch (error) {
        next(error)
    }
}

const getMe = (req,res,next)=>{
    try {
        const currentUser = req.user
        res.status(200)
            .json(currentUser)
    } catch (error) {
        next(error)
    }
}

module.exports={
    getAllAuthors,
    getSingleAuthor,
    postAuthor,
    deleteAuthor,
    patchAuthor,
    cloudFileUpload,
    getPostsPerAuthor,
    getMe
}
