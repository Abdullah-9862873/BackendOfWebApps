import mongoose from "mongoose";


// Mongoose Schema
const schema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

// Mongoose Model
export const User = mongoose.model("User", schema);