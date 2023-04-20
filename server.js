import { app } from "./app.js";
import { connectDb } from "./data/database.js";

// Database Connection
connectDb();


app.listen(process.env.PORT, ()=>{
    console.log(`Server is Working on PORT ${process.env.PORT} in ${process.env.NODE_ENV} Mode: `);
})
