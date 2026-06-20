const mongoose=require("mongoose");
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB Connected successfully");
    }
    catch(err)
    {
        console.log("Connection to Db is failed!!!");
        console.log(err.message);
        process.exit(1);
    }
}
module.exports=connectDB;
// const mongoose=require("mongoose");
// const connectDB=async()=>{
//     try{
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("Mongo Db connected Successfully");
//     }catch(err)
//     {
//         console.log("Connection to the database failed");
//         console.log(err.message);
//         process.exit(1);
//     }
// };