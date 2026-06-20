const mongoose=require("mongoose")

const post =require('./posts.schema.js')
const author=require('../authors/authors.schema.js')
const comment = require("../comments/comments.schema.js")

const getAllPosts= async (page=1,limit=10)=>{
    const skip=(page-1)*limit
    const allPosts= await post.find().limit(limit).skip(skip).populate("author","name lastname email")
    const totalPosts= await post.countDocuments()
    const totalPages=Math.ceil(totalPosts/limit)
    return{
        data:allPosts,
        page,
        limit,
        totalPosts:totalPosts,
        totalPages:totalPages
    }
}

const getSinglePost = async (id)=>{
    return post.findById(id)
}

const getPostsperTitle = async (rawTitle)=>{
    return post.find({title:{
        $regex:rawTitle,
        $options:"i"
    }})
}

const getCommentsByPostId = async (id)=>{
    return comment.find({post:id})
}

const getSingleComment = async (postId,commentId)=>{
    return comment.findOne({
        post:postId,
        _id:commentId
    })
}

const createPost = async (newPostsData)=>{
    const newPost = new post(newPostsData)
    const savedPost= await newPost.save()
    await author.updateOne(
        {_id:newPostsData.author},
        {$push:{posts:savedPost}}
    )
    return savedPost
}

const createComment = async (newCommentData)=>{
    const newComment = new comment(newCommentData)
    const savedComment = await newComment.save()
    await post.updateOne(
        {_id:newCommentData.post},
        {$push:{comments:savedComment}}
    )
    return savedComment
}

const deletePost = async (id)=>{
    const deletedPost=await post.findById(id)

    if(!deletedPost){
        return null
    }
    await post.findByIdAndDelete(id)
    await author.updateOne(
        {_id:deletedPost.author},
        {$pull:{posts:id}}
    )
    return deletedPost

}

const deleteComment = async (postId,commentId)=>{
    const deletedComment = await comment.findOneAndDelete({
        post:postId,
        _id:commentId
    })
    await post.updateOne(
        {_id:postId},
        {$pull:{comments:commentId}}
    )
    return deletedComment
}

const modifyPost = async (id,newData)=>{
    return post.findByIdAndUpdate(id,newData,{returnDocument: 'after'})
}

const modifyComment = async (commentId,newData)=>{
    return modifiedComment = comment.findOneAndUpdate({_id:commentId},newData,{returnDocument: 'after'})
}

module.exports= {
    createPost,
    getAllPosts,
    getSinglePost,
    deletePost,
    modifyPost,
    getPostsperTitle,
    createComment,
    getCommentsByPostId,
    getSingleComment,
    deleteComment,
    modifyComment
}