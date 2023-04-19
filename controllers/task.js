import {Task} from "../models/task.js";

export const newTask = async (req,res,next)=>{
    const {title,description} = req.body;

    await Task.create({
        title,
        description,
        user: req.user
    })

    res.status(201).json({
        success: true,
        message: "Task Added Succesfully"
    })
}

export const getMyTasks = async (req,res,next)=>{
    const userId = req.user._id;

    const tasks = await Task.find({user: userId});
    console.log(userId);
    res.json({
        success: true,
        tasks
    })
}

export const updateTask = async(req,res)=>{
    // To find a particular task I have to get the id of that particular task right
    const {id} = req.params;

    const task = await Task.findById(id);

    if(!task){
        return res.status(404).json({
            success:false,
            message: "Task not found"
        })
    }else{
        task.isCompleted = !task.isCompleted;

        await task.save();
    
        res.json({
            success:true,
            message: "Updated Succesfully"
        })
    }
}

export const deleteTask = async(req,res)=>{
    const {id} = req.params;
    const task = await Task.findById(id);

    if(!task){
        return res.status(404).json({
            success:false,
            message: "Task not found"
        })
    }

    await Task.deleteOne({ _id: id })

    res.json({
        success:true,
        message: "Deleted Succesfully"
    })
}

