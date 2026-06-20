const mongoose = require ('mongoose')

const commentSchema = new mongoose.Schema({
    author:{
        type: String,
        require: true
    },
    content:{
        type: String,
        require: true
    },
    post:{
        type: String,
        require: true,
    }

},
{
    timestamps: true,
    strict:true
})

const comment = mongoose.model("comment", commentSchema)

module.exports= comment