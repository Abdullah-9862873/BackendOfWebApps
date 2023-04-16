import express from "express";
import fs from "fs";
import path from "path";


const app = express();

// using middlewares
app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({extended: true}));

// Setting up view engine
app.set("view engine", "ejs");

const users = [];


app.get("/", (req,res)=>{
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
    res.render("index", {name: "Abdullah"});

    // The following is to serve the static file
    // res.sendFile("index.html");
})

app.get("/success", (req,res)=>{
    res.render("success");
})

app.get("/users", (req,res)=>{
    res.json({users})
})

// app.post("/", (req,res)=>{
//     console.log(req.body);
//     // console.log(req.body.name);
//     users.push({userName: req.body.name, userEmail: req.body.email});

//     // res.render("success");
//     res.redirect("/success");
// })
app.post("/contact", (req,res)=>{
    console.log(req.body);
    // console.log(req.body.name);
    users.push({userName: req.body.name, userEmail: req.body.email});

    // res.render("success");
    res.redirect("/success");
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
*/