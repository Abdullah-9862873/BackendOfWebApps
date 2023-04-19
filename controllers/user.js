import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/feature.js";

export const getAllUsers = async (req,res)=>{}

export const registeruser = async (req,res)=>{
    const {name,email,password} = req.body;

    let user = await User.findOne({email});

    if(user){
        // If user exists then throw error
        return res.status(404).json({
            success:false,
            message: "User already exist"
        })
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({name,email, password: hashedPassword});

    sendCookie(user,res,"Registered Successfully", 201);
}

export const loginUser = async(req,res)=>{
    const { email, password} = req.body;

    // Checking if email is correct
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return res.status(404).json({
            success:false,
            message: "Invalid Email or Password"
        })
    }

    // Checking and comparing password
    const isMatched = await bcrypt.compare(password, user.password);

    if(!isMatched){
        return res.status(404).json({
            success:false,
            message: "Invalid Email or Password"
        })
    }

    sendCookie(user,res, `Welcome back ${user.name}`, 200);
}

export const logout = async (req,res)=>{
    res.status(200).cookie("token","",{
        expires: new Date(Date.now())
    }).json({
        success:true,
        message: "Logout Succesfully"
    })
}


export const getMyProfile = (req,res)=>{
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