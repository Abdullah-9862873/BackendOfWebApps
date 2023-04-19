import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";



export const app = express();

// Using MiddleWare
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

config({
    path: "./data/config.env"
})


app.get("/", (req,res)=>{
    res.send("Nice working");
})

/*
___________________________________________________________________________________________________
----> To accept the data from "form" we have used "express.urlencoded" in the "code" session
----> But to accept the data from the body without any form or in the "postman" we have to use an express middleware named "json" using "app.use(express.json())"

___________________________________________________________________________________________________
---> Dynamic routes are written with the help of colon(:) as in the following, whatever you'll write after that userid/ in the get requst, it will take it as the next thing:

------------------->Code<-------------------
app.get("/userid/:id", async (req,res)=>{
    const {id} = req.params;

    const user = await User.findById(id);
    res.status(200).json({
        success:true,
        user,
    })
})
------------------->Code<-------------------

For example if you enter "localhost:4000/userid/joking"
and then if you do "console.log(req.params.id) then it will print "joking"

___________________________________________________________________________________________________
----> Convention is to write the dynamic routes at the end and the static routes at first this will prevent you from errors

___________________________________________________________________________________________________
The following is used in this code which means that every route of the userRouter will start with /api/v1/users
app.use("/api/v1/users", userRouter);
*/