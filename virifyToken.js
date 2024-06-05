import jwt from "jsonwebtoken";
import {createError} from './error.js'
export const virifyToken = async (req, res, next) => {
    console.log("req",req.cookies) 
    const token = req.headers.token;

    
    // const token = await req.cookies.access_token 
    if(!token) return next(createError(401 , "You are not authenticated"))

    jwt.verify(token, process.env.JWT_SECRET_KEY , (err , user) => {

 if (err) return next(createError(403, "Token is not valid"));

 req.user = user;
 next()
});
}
