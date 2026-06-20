const multer = require('multer')
const cloudinary=require('cloudinary').v2
const {CloudinaryStorage}=require('multer-storage-cloudinary')
require("dotenv").config()

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
})

const coverCloudStorage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'strive_blog_cover',
        format: async (req,file)=>'jpg',
        public_id: async(req,file)=> file.originalname
    }
})

const avatarCloudStorage= new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'atrive_blog_avatar',
        format: async (req,file)=>'jpg',
        public_id: async (req,file)=> file.originalname
    }


    /* params: async (req, file) => {
    console.log("PARAMS CALLED")

    return {
      folder: 'strive_blog_cover',
      format: 'jpg',
      public_id: file.originalname
    } */

    /* params: {
    folder: 'strive_blog_cover',
    format: async () => {
      console.log("FORMAT")
      return 'jpg'
    },
    public_id: async (req, file) => {
      console.log("PUBLIC_ID")
      return file.originalname
    }
    },
    uploadStream: (req, file) => {
        console.log("UPLOAD STREAM START")
    } */

})

const coverCloudStorageMiddleware = multer({storage:coverCloudStorage})
const avatarCloudStorageMiddleware = multer({storage:avatarCloudStorage})

module.exports= {
    coverCloudStorageMiddleware,
    avatarCloudStorageMiddleware
}
