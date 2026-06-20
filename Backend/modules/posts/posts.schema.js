const mongoose=require('mongoose')

const postSchema = new mongoose.Schema({

    category:{
        type:String,
        required:false,
        default:"General"
    },
    title:{
        type:String,
        required:true,
    },
    cover:{
        type:String,
        required:false,
        default:"https://picsum.photos/seed/picsum/200/300"
    },
    readTime:{
        time:{
            type:Number,
            default:"5"
        },
        unit:{
            type:String,
            default:"minutes"
        }
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"author"
    },
    content:{
        type:String,
        required:true,
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
        default: []
    }]

},
{
    timestamps:true,
    strict:true
})

const post = mongoose.model("post",postSchema)

module.exports= post