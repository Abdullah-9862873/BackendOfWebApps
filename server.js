import { app } from "./app.js";
import { connectDb } from "./data/database.js";

// Database Connection
connectDb();


app.listen(process.env.PORT, ()=>{
    console.log("Server is Working: ");
})
