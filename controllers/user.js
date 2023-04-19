import { User } from "../models/user.js";

export const getAllUsers = async (req,res)=>{
    const users = await User.find({});

    res.json({
        success:true,
        users: users
    })
}

export const updateUser = async (req,res)=>{
    const {id} = req.params;

    const user = await User.findById(id);
    res.status(200).json({
        success: true,
        message: "User updated"
    })
}

export const deleteUser = async (req,res)=>{
    const {id} = req.params;

    const user = await User.findById(id);
    res.status(200).json({
        success:true,
        message: "User deleted"
    })
}

export const createNewUser = async (req,res)=>{
    await User.create({
        name: "Abdullah",
        email: "ag9862873@gmail.com",
        password: "password"
    })

    res.status(201).json({
        success:true,
        message: "Registered Succesfully"
    })
}

export const findUserById = async (req,res)=>{
    const {id} = req.params;

    const user = await User.findById(id);
    res.status(200).json({
        success:true,
        user,
    })
}
