import mongoose from "mongoose";


// Mongoose Schema
const schema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    isCompleted:{
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

// Mongoose Model
export const Task = mongoose.model("Task", schema);



/*
___________________________________________________________________________________________________________
Here "ref" in the "user" is the reference of the User collection and that is why it has the same name as the name of the collection "User"
___________________________________________________________________________________________________________
*/