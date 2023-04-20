import jwt from "jsonwebtoken";


export const sendCookie = (user,res,message,statusCode=200)=>{
    // Generating token for the cookie
    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)

    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 15*60*1000,
        // sameSite: process.env.NODE_ENV==="Development" ? "lax" : "none",
        // secure: process.env.NODE_ENV === "Development" ? false : true
    }).json({
        success:true,
        message: message,
    })
}

/*
____________________________________________________________________________________________
----> Here sameSite is by default "lax" which means that the backend and frontend must be the same sites... But in our case the backend and frontend are on different domains so we have to set the sameSite to none

----> If you set the sameSite... Then you have to set the secure... 

----> Here is one case that while working with the local host we have to set the same site to lax and the secure to false... Otherwise the cookies will not get saved and the localhost or the postman works as if we are making a request not from the same site... That's why we have to create a new variable in the config file which tells whether we are on Development mode or in Production mode... So in developmenet mode the "sameSite" will be "lax" and the "secure" will be "false" while when we'll be in the production mode then the sameSite will be "none" and the "secure" will be "true"
____________________________________________________________________________________________


*/