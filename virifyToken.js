import jwt from "jsonwebtoken";
import {createError} from './error.js'
export const virifyToken = async (req, res, next) => {
  // const token = req.headers.token;
  // console.log("request header", req.headers);

  const token = await req.headers.cookie.split('=')[1];

  if (!token) return next(createError(401, "You are not authenticated"));

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return next(createError(403, "Token is not valid"));

    req.user = user;
    next();
  });
}
