import ErrorHandler from "../middlewares/error.js";
import {Task} from "../models/task.js";

export const newTask = async (req,res,next)=>{
    try {
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
    } catch (error) {
        next(error);
    }
}

export const getMyTasks = async (req,res,next)=>{
    try {
        const userId = req.user._id;

        const tasks = await Task.find({user: userId});
        console.log(userId);
        res.json({
            success: true,
            tasks
        })
    } catch (error) {
      next(error);  
    }
}

export const updateTask = async(req,res,next)=>{
    try {
            // To find a particular task I have to get the id of that particular task right
            const {id} = req.params;

            const task = await Task.findById(id);
        
            if(!task){
                return await next(new ErrorHandler("Task not found", 404));
            }else{
                task.isCompleted = !task.isCompleted;
        
                await task.save();
            
                res.json({
                    success:true,
                    message: "Updated Succesfully"
                })
            }
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async(req,res,next)=>{
    const {id} = req.params;
    const task = await Task.findById(id);

    if(!task){
        return await next(new ErrorHandler("Task not found", 404));
    }

    await Task.deleteOne({ _id: id })

    res.json({
        success:true,
        message: "Deleted Succesfully"
    })
}

