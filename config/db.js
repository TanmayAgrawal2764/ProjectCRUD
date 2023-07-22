const mongoose=require("mongoose");

const mongodb=async()=>{
    const conn=await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Data base is connected: ${conn.connection.host}`.blue.bold)
}
module.exports=mongodb;