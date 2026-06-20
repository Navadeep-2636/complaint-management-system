const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const connectDB=require("./config/db");
dotenv.config();
connectDB();
const app=express();
//Middleware
app.use(cors({ 
  origin: function (origin, callback) {
    callback(null, true);
  }, 
  credentials: true 
}));
app.use(express.json());
const userRoutes=require("./routes/userRoutes");
app.use("/api/users",userRoutes);
app.get("/",(req,res)=>{
    res.send("API is running");
});
const complaintRoutes = require("./routes/complaintRoutes");
app.use("/api/complaints", complaintRoutes);
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`The server is running in the Port ${PORT}`);
});
// const dotenv=require("dotenv");
// const express=require("express");
// const connectDB=require("./config/db");
// dotenv.config();
// connectDB();
// const app=express();
// const PORT=process.env.PORT;
// app.listen(PORT,()=>{
//     console.log(`The server is running in the port ${PORT}`);
// });