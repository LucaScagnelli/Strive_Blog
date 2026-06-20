const mongoose=require("mongoose")
const bcrypt=require('bcrypt')

const authorsSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    googleId:{
        type:String,
    },
    birthDate:{
        type: String,
        require:function(){
            return !this.googleId
        },
        default:""
    },
    avatar:{
        type: String,
        require:true
    },
    password:{
        type:String,
        require:function(){
            return !this.googleId
        },
        select:false
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        default:[]
    }]
},
{
    timestamps:true,
    strict:true
})

authorsSchema.pre('save',async function () {

    if(!this.isModified("password")){
        return
    }

    const salt= await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})

authorsSchema.pre('findOneAndUpdate', async function () {

    const update = this.getUpdate()

    if(update.password){

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(update.password,salt)

    this.setUpdate({
        ...update,
        password:hashedPassword
    })}

})

const author = mongoose.model("author", authorsSchema)

module.exports=author