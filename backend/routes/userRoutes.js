const express=require("express");
const router=express.Router();
const {registerUser,userLogin,getUserProfile}=require("../controllers/userController")
// console.log(registerUser);
router.post("/register",registerUser);
router.post("/login",userLogin);
const protect = require("../middleware/authMiddleware");
router.get("/profile", protect, getUserProfile);
module.exports=router;
// const express=require("express");
// const router=express.Router();
// const  {registerUser} = require("../controllers/userController");
// router.post("/register",registerUser);
// module.exports=router;