const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const registerUser=async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser)
        {
            return res.status(400).json({
                success:false,
                message:"Email is existing",
            });
        }
        let salt=await bcrypt.genSalt(10);
        let hashedPassword=await bcrypt.hash(password,salt);
        const user=await User.create({name,email,password:hashedPassword});
        res.status(201).json({
            success:true,
            user,
        });
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:err.message,
        });
    }
};
const userLogin=async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({
                success:false,
                message:"User does not exist"
            })
        }
        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch)
        {
            return res.status(400).json({
                success:false,
                message:"Invalid username or password",
            });
        }
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );
        res.status(200).json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:err.message,
        });
    }
}
const getUserProfile = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
module.exports={registerUser,userLogin,getUserProfile};
// const User=require("../models/User");
// const registerUser=async (req,res)=>{
//     try{
//         let name=req.body.name;
//         let email=req.body.email;
//         let password=req.body.password;
//         const existingUser=await User.findOne({email});
//         if(existingUser)
//         {
//             return res.status(400).json({
//                 success:false,
//                 message:"email already existed",
//             });
//         }
//         const user=await User.create({
//         name,
//         email,
//         password 
//         });
//         res.status(201).json({
//             success:true,
//             user,
//         });
//     }
//     catch(err)
//     {
//         res.status(500).json({
//             success:false,
//             message:err.message,
//         });
//     }
// }
// module.exports={registerUser};