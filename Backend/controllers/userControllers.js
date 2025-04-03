

import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";


const register = async(req,res)=>{
  try{
      const {username, email, password }    =   req.body;

      if(!username || !email || !password){
          return res.status(400).json({
            success: false,
            message :  "Please enter all  field",
          })
      }

      const user =  await User.findOne({email});

      if(user){
        return res.status(400).json({
          success : false,
          message : "User already exist with this mail",
        })
      }
 
      const hashedPassword = await   bcrypt.hash(password, 10);

      await User.create({
        username,
        email,
        password : hashedPassword,
      });

      res.status(201).json({
        success : true,
        message : "Account Created Sucessfully",
      })

  

  }
  catch(error){
         console.log(error);
         res.status(500).json({
          success : false,
          message : "Failed to  register",
         })
  }
}


const login = async(req,res)=>{
  try{
    const {email, password} = req.body;

    if(!email  || !password){
      return res.status(400).json({
        success : false,
        message : " All fields are required",
      })
    }

    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({
        success : false,
        message : "Incorrect Email  or Password",
      })
    }

    const isPasswordMatch = await bcrypt.compare( password, user.password);
    if(!isPasswordMatch){
      return res.status(400).json({
        success:false,
        message:"Incorrect email or password"
    });
    }
    generateToken(res, user, `Welcome Back  ${user.username}`);
  }
  catch(error){
    console.log(error);
    res.status(500).json({
     success : false,
     message : "Failed to  register",
    })
  }
}




const logout = async(_,res)=>{
  try {
    return res.status(200).cookie("token", "", {maxAge:0}).json({
        message:"Logged out successfully.",
        success:true,
    })
} catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Failed to logout"
    }) 
}
}


const getUserProfile = async(req,res)=>{
  try {
    console.log("Retrieved User ID from Auth Middleware:", req.user.id);
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if(!user){
        return res.status(404).json({
            message:"Profile not found",
            success:false
        })
    }
    return res.status(200).json({
        success:true,
        user
    })
} catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Failed to load user"
    })
  }
}

export {
  register, login, logout, getUserProfile,
};


