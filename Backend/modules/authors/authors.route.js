const express = require("express")
const authorsControllers= require('./authors.controllers.js')
const {avatarCloudStorageMiddleware}= require('../../middlewares/multer/multer.js')
const {bodyValidation, bodyValidator}= require('../../middlewares/authorsMiddleware/bodyValidator.js')

const authorsRouter=express.Router()

authorsRouter.get('/', authorsControllers.getAllAuthors)
authorsRouter.get('/me', authorsControllers.getMe)
authorsRouter.get('/:id', authorsControllers.getSingleAuthor)
authorsRouter.get('/:id/blogPosts', authorsControllers.getPostsPerAuthor)

authorsRouter.post('/',[bodyValidation, bodyValidator] ,authorsControllers.postAuthor)

authorsRouter.delete('/:id', authorsControllers.deleteAuthor)

authorsRouter.patch('/avatar', avatarCloudStorageMiddleware.single("avatar"), authorsControllers.cloudFileUpload)
  
authorsRouter.patch('/:id', authorsControllers.patchAuthor)



module.exports=authorsRouter