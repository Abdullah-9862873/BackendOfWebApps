import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req,res, next)=>{
    try {
        const user = await User.find();

        res.status(200).json({
            success:true,
            user,
        })
    } catch (error) {
        next(error);
    }
}

export const registeruser = async (req,res, next)=>{
    try {
        const {name,email,password} = req.body;

    let user = await User.findOne({email});

    if(user){
        // If user exists then throw error
        return next(new ErrorHandler("User already exisit", 404))
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({name,email, password: hashedPassword});

    sendCookie(user,res,"Registered Successfully", 201);
    } catch (error) {
        next(error);
    }
}

export const loginUser = async(req,res,next)=>{
    try {
        const { email, password} = req.body;

    // Checking if email is correct
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    // Checking and comparing password
    const isMatched = await bcrypt.compare(password, user.password);

    if(!isMatched){
        return next(new ErrorHandler("Invalid Email or Password", 404));
    }

    sendCookie(user,res, `Welcome back ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
}

export const logout =  (req,res, next)=>{
        res.status(200).cookie("token","",{
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV==="Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true
        }).json({
            success:true,
            message: "Logout Succesfully"
        })

}


export const getMyProfile = (req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        user
    })
}



/*
_____________________________________________________________________________________________
In the following code I have used the select("+password") which bascially means that when creating the model I have specified that the password selection will be false so I can't use the password directly by user.password... So I have to make the selection first and then use it... This is bascially to ensure the security

const user = await User.findOne({email}).select("+password");
_____________________________________________________________________________________________



*/