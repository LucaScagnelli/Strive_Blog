const express = require("express")

const postsService = require("./posts.service.js")
const post = require("./posts.schema.js")
const comment = require("../comments/comments.schema.js")

const getAllPosts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10

        const allPosts = await postsService.getAllPosts(page, limit)

        if (allPosts.length === 0) {
            return res.status(404)
                .send("Nessun post trovato")
        }
        return res.status(200)
            .send(allPosts)
    } catch (error) {
        next(error)
    }
}

const getSinglePost = async (req, res, next) => {
    try {
        const singlePost = await postsService.getSinglePost(req.params.id)
        if (!singlePost) {
            res.status(404)
                .send("Post non trovato")
        }
        res.status(200)
            .send(singlePost)
    } catch (error) {
        next(error)
    }
}

const getPostsperTitle = async (req, res, next) => {
    try {
        const { title } = req.query;
        const posts = await postsService.getPostsperTitle(title)
        res.status(200)
            .json({
                statusCode: 200,
                posts
            })
    } catch (error) {
        next(error)
    }
}

const getCommentsByPostId = async (req, res, next) => {
    try {
        const comments = await postsService.getCommentsByPostId(req.params.id)
        res.status(200)
            .json({
                statusCode: 200,
                comments
            })
    } catch (error) {
        next(error)
    }
}

const getSingleComment = async (req, res, next) => {
    try {
        const comment = await postsService.getSingleComment(req.params.id, req.params.commentId)
        res.status(200)
            .json({
                statusCode: 200,
                comment
            })
    } catch (error) {
        next(error)
    }
}

const postPost = async (req, res, next) => {
    try {
        const postedPost = await postsService.createPost(req.body)
        res.status(201)
            .send(postedPost)
    } catch (error) {
        next(error)
    }
}

const postComment = async (req, res, next) => {
    try {
        const savedComment = await postsService.createComment(req.body)
        res.status(201)
            .json({
                statusCode: 201,
                savedComment
            })
    } catch (error) {
        next(error)
    }
}

const deletePost = async (req, res, next) => {
    try {
        const deletedPost = await postsService.deletePost(req.params.id)
        res.status(200)
            .send(deletedPost)
    } catch (error) {
        next(error)
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const deletedComment = await postsService.deleteComment(req.params.id, req.params.commentId)
        res.status(200)
            .json({
                statusCode: 200,
                deletedComment
            })
    } catch (error) {
        next(error)
    }
}

const patchPost = async (req, res, next) => {
    try {
        const updatedPost = await postsService.modifyPost(req.params.id, req.body)
        res.status(200)
            .send(updatedPost)
    } catch (error) {
        next(error)
    }
}

const patchComment = async (req, res, next) => {
    try {
        const patchedComment = await postsService.modifyComment(req.params.commentId, req.body)
        res.status(200)
            .json({
                statusCode: 200,
                patchedComment
            })
    } catch (error) {
        next(error)
    }
}

const cloudFileUpload = (req, res, next) => {
    try {

        if (!req.file) {
            return res.status(400)
                .json({
                    message: "Nessun file ricevuto"
                })
        }

        return res.status(200)
            .json({
                statusCode: 200,
                img: req.file.path
            })
    } catch (error) {
        next(error)
    }

}

module.exports = {
    postPost,
    getAllPosts,
    getSinglePost,
    deletePost,
    patchPost,
    cloudFileUpload,
    getPostsperTitle,
    postComment,
    getCommentsByPostId,
    getSingleComment,
    deleteComment,
    patchComment
}
