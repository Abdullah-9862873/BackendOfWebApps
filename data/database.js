import mongoose from "mongoose";

export const connectDb = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "backend_api",
        }).then(()=>console.log("DataBase Connected")).catch((e)=>{
        console.log(e);
    })
}