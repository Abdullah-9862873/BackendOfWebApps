import express from "express";
import fs from "fs";
import path from "path";


const app = express();



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

*/