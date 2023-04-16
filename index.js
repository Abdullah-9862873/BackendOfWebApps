import http from "http";
import path from "path";
// import name, {name2,name3} from "./features.js";
import * as Obj from "./features.js"
import loveCalculator from "./LovePercentage.js";

// To read and write we use fs
import fs, { readFileSync } from "fs";

console.log(Obj.name2);
console.log(Obj.name3);
console.log(Obj.default); 


// console.log(name);
// console.log(name2 + " " + name3);

const home = fs.readFileSync("./index.html");

// path
// console.log(path.extname("/home/random/index.html"));
// console.log(path.extname("/home/random/index.js"));
// console.log(path.dirname("/home/random/index.js"));

const server = http.createServer((req,res)=>{
    if(req.url === "/"){
        res.end("<h1>This is home page</h1>");
    }else if(req.url==="/about"){
        res.end(`<h1>The percentage of love is: ${loveCalculator()}</h1>`);
    }else if(req.url==="/this"){
        fs.readFile("./index.html", (err,data)=>{
            res.end(data);
        })
    }else if(req.url==="/readfile"){
        // res.end(fs.readFileSync("./index.html"));
        res.end(home);
    }
    else{
        res.end("<h1>Page not found</h1>");
    }
})

server.listen(5000, ()=>{
    console.log("Server is listening on port 5000: ")
})