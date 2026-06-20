const express = require("express")

const {coverCloudStorageMiddleware} = require("../../middlewares/multer/multer.js")
const postsControllers = require("./posts.controllers.js")

const postsRouter=express.Router()

postsRouter.get('/allPosts', postsControllers.getAllPosts)
postsRouter.get('/', postsControllers.getPostsperTitle)
postsRouter.get('/:id', postsControllers.getSinglePost)
postsRouter.get('/:id/comments', postsControllers.getCommentsByPostId)
postsRouter.get('/:id/comments/:commentId', postsControllers.getSingleComment)

postsRouter.post('/', postsControllers.postPost)
postsRouter.post('/:id', postsControllers.postComment)

postsRouter.delete('/:id', postsControllers.deletePost)
postsRouter.delete('/:id/comments/:commentId', postsControllers.deleteComment)

postsRouter.patch('/cover', coverCloudStorageMiddleware.single("img"), postsControllers.cloudFileUpload )
postsRouter.patch('/:id', postsControllers.patchPost)
postsRouter.patch('/:id/comments/:commentId', postsControllers.patchComment)


module.exports=postsRouter