import express from "express";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { name } from "ejs";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";


// Connect Mongodb
mongoose.connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
})

// Mongodb Schema
const messageSchema = new mongoose.Schema({
    name: String,
    email: String
})

// MongoDb Schema for 2nd Login page
const userSchema = new mongoose.Schema({
    userName: String,
    password: String
})

// MongoDb model
const Message = mongoose.model("Messages", messageSchema);

// MongoDb model for 2nd login page
const User = mongoose.model("User", userSchema);


const app = express();

// using middlewares
app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Setting up view engine
app.set("view engine", "ejs");

const users = [];


// app.get("/", (req,res)=>{
    // res.send("Hello welcome to home page");
    // res.sendStatus(500);
    // res.json({
    //     success: true,
    //     products: [],
    // })

    // res.status(400).send("<h1>Meri marzi</h1>");
    // res.status(400).json({
    //     success: false
    // })

    // res.sendFile("./index.html");        Gives Error
    // const pathLocation = path.join(path.resolve(), "index.html");
    // res.sendFile(pathLocation);

    // The following is to serve the dynamic file
    // res.render("index", {name: "Abdullah"});

    // The following is to serve the static file
    // res.sendFile("index.html");
// })

// app.get("/success", (req,res)=>{
//     res.render("success");
// })

// app.get("/users", (req,res)=>{
//     res.json({users})
// })

// To test the database connection
// app.get("/add", async (req,res)=>{
//     await Message.create({
//         name: "sample2",
//         email: "sampleEmail2@gmail.com"
//     }).then(()=>{
//         res.redirect("/success");
//     })
// })

// app.post("/", (req,res)=>{
//     console.log(req.body);
//     // console.log(req.body.name);
//     users.push({userName: req.body.name, userEmail: req.body.email});

//     // res.render("success");
//     res.redirect("/success");
// })

// app.post("/contact", async (req,res)=>{
//     console.log(req.body);
//     // console.log(req.body.name);
//     // users.push({userName: req.body.name, userEmail: req.body.email});
//     const messageData = ({userName: req.body.name, userEmail: req.body.email});
//     await Message.create({name: messageData.userName, email:messageData.userEmail});

//     // res.render("success");
//     res.redirect("/success");
// })

// For Authentication
const isAuthenticated = async (req,res,next)=>{
    const {token} = req.cookies;
    if(token){
        // Decode the token and verify
        const decoded = jwt.verify(token, "kajshfkljasdf");
        req.user = await User.findById(decoded._id);
        next();
    }else{
        res.render("login");
    }
}


app.get("/", isAuthenticated, (req,res)=>{
    res.render("logout", {name: req.user.userName});
})
app.get("/login", (req,res)=>{
    res.render("login");
})
app.get("/logout", (req,res)=>{
    res.render("logout");
})

app.get("/register", (req,res)=>{
    res.render("register");
})

app.post("/register", async (req,res)=>{
    const {userName, email, password, confirm_password} = req.body;
    
    if(password !== confirm_password){
        res.render("register", {message: "password does not match"});
    }else{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({userName:req.body.userName, password: hashedPassword})
        const token = jwt.sign({_id:user._id}, "kajshfkljasdf");
    
        res.cookie("token", token, {
            httpOnly:true,
            expires: new Date(Date.now()+60*1000)
        })
        res.render("logout", {name: req.body.userName});
    }
})

app.post("/login", async (req,res)=>{    
    // Check if the user is already present
    const {userName, password} = req.body;
    
    let user = await User.findOne({userName:userName});
    if(!user){
        // return console.log("Register first");
        return res.render("register");
    }else{
        // const isMatch = user.password === password;
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.render("login", {userName, message: "Incorrect Password"});
        }else{
            const token = jwt.sign({_id:user._id}, "kajshfkljasdf");
    
            res.cookie("token", token, {
                httpOnly:true,
                expires: new Date(Date.now()+60*1000)
            })
            res.render("logout", {name: req.body.userName});
        }
    }
})

app.post("/logout", (req,res)=>{
    res.cookie("token", "", {
        httpOnly:true,
        expires:new Date(Date.now())
    })
    res.redirect("/");
})

app.listen(5000, ()=>{
    console.log("Server is listening");
})


/*
Express is basically used to shorten the code of node js
----> Like in the node js we use the if else conditions and check if the req.url==="/" then display a particular thing but with the help of express we can write it very shortly... 
----> Plus the "app" here is basically the server
----> We don't have to import http then use that http to create server... We can do that directly using the express
----> The methods we used to access using the req.method like "POST", "GET", "DELETE", "PUT"... We can access all of them using "app" now

______________________________________________________________________________________________
---> To read the file you cannot do directly like "res.sendFile("./index.html")".... You have to read the file using "fs" and then send the file using the "res.sendFile"
______________________________________________________________________________________________
----> "path.resolve()" gives the current directory and we are using the path.resolve because we have used the "type: module" in the "package.json" file... If we have used "type: commonJs" there which is by default then we could have access the current directory using "__dirname"

______________________________________________________________________________________________
----> To make the frontend like whatever you send from the backend should go to the index.html file dynamically and should be displayed on the webpage... For that we have to use the template... Named "EJS" stands for "Embedded JavaScript Template"...
----> To use it we have to install it using "npm install ejs"

______________________________________________________________________________________________
----> To send the file we use the "render" method of "res"... This will help to use the variables to render the data in the html file dynamically

______________________________________________________________________________________________
----> Set engine is done so that we don't have to specify the extension every time... 
----> You have to make a folder named "views" and write the "ejs" files inside of it and you have to set the engine as it is to render the ejs file successfully on the web page

______________________________________________________________________________________________
----> If you have used a variable in your ejs file and that variable is not declared in the js file then you are gonna get an error... To prevent that error... We can use "locals" in the ejs file...

______________________________________________________________________________________________
----> In order to serve a static file we create a new folder "public" in the main directory... 
static files include all the "css" "image" or "html" files which do not use the dynamic variables

----> To use the static files we have to use the middleware and to use the middleware we have to use "app.use" and then write the middleware inside it and the middleware is express.static

so the code we use will be
---------app.use(express.static(path.join(path.resolve(),"public")));----------
And now we can
---------res.sendFile("index.html");---------


______________________________________________________________________________________________
----> Now one thing that if you link a css file in the "index.ejs" file which is inside the "views" folder
----> Like the following
<link rel="stylesheet" href="styles.css">

----> Then it will first find it inside the views folder and if it is not present there then by default it will find it inside the "public" folder

______________________________________________________________________________________________
Cookies are basically used to store the information and when the cookies is present in the Application option when you do the inspect element on the web browser then that means that the user is authenticated otherwise the user is not authenticated

Logout will make the cookies destroyed
Login will make the cookies in the Application option in the web page inspect element

______________________________________________________________________________________________
Now to access the req.cookies in the console or to use the following command we actually have to parse the cookies and for that we have to use the cookies parser package of npm
console.log(req.cookies);

______________________________________________________________________________________________
-----> You can use as many handlers as you want and by handlers I mean (req,res,next) functions

-----> Here I have created a function named "isAuthenticated" and that function is basically a handler which I added in the "app.get("/")" this one....
-----> The isAuthenticated handler has something named "next()" that is used to call the next handler... So isAuthenticated is working like if the user is authenticated or if the cookies are present in the Application then simply direct the user to the next hanlder which is doing what?? Which is basically rendering logout page

______________________________________________________________________________________________
Now in the first app.post("/login") you can see that when I login then the user Id is basically used as the token... But this is a confidential data so it needs to be protected... And to protect it we have to use a token called "json web token"

______________________________________________________________________________________________
-----> There is a trick in the ejs that if the variable is present then display otherwise do not display

-----> For that you have to use the "locals.(variableName)" so like if the variable is message and you want to display only when the user type incorrect password or something like that then you can do this by simply using the variable message like "locals.message"

______________________________________________________________________________________________
----> There is a trick using which you can hash the passwords in the database and it would be so rediculous if the workers or the managers of the database could access any of the password
----> So to hash the password we are gonna use a package named "bcrypt"
*/