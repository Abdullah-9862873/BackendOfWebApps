import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import ErrorHandler from "./middlewares/error.js";
import cors from "cors";



export const app = express();

// Using MiddleWare
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

config({
    path: "./data/config.env"
})


app.get("/", (req,res)=>{
    res.send("Nice working");
})

// Using Error Middleware
app.use(ErrorHandler);

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

___________________________________________________________________________________________________
----> Now to deploy the node js application we have download a package called "cors" and we need this package to basically allow our fronend Url to make requests to the backend url... Otherwise, as the frontend will be deployed to a seperate domain and the backend is deployed to seperate domain then the frontend domain is not allowed to make get post and other requests on the backend domain unless we specify that this particular domain is allowed to make the requests... This thing is done using cors

----> Also cors helps to set the credentials in the header... Like when the user log in then the cookie credential will be set in the cookies in browser....

----> You can add some more origins like
origin: [process.env.FRONTEND_URL, process.env.FRONTEND_URL2],

___________________________________________________________________________________________________
----> I have excluded the NODE_ENV from the config file and I have added it to the package.json so when we do "npm start" then we'll be in the production and when we do "npm run dev" then we'll be in the development mode
___________________________________________________________________________________________________
*/