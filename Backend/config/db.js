const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

const mongoose=require("mongoose")
require("dotenv").config()

const databaseConnectionString = process.env.MONGO_URI


const initDatabaseConnection=async()=>{
    try{
        await mongoose.connect(databaseConnectionString)
        console.log("database connected")
    }catch(error){
        console.error("error during database connection", error.message)
        process.exit(1)
    }
}

const startServer=async(port,server)=>{
    initDatabaseConnection()
    server.listen(port,()=>{
        console.log('new way running server nodemon')
    })
}

module.exports=startServer