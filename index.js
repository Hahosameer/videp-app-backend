// import express from "express"
// import { connectDB } from "./config/default.js";
// import userRoutes from './routes/users.js';
// import videoRoutes from './routes/videos.js';
// import commentRoutes from './routes/comments.js';
// import authRoutes from "./routes/auth.js";
// import cookieParser from "cookie-parser";
// import cors from "cors"
// const app = express()

// const PORT = 5000;

// app.use(express.json());


// // app.use(
// //   cors({
// //     origin: [
// //       "http://localhost:5173",
// //       "https://video-app-frontend-pearl.vercel.app",
// //     ],
// //     credentials: true,
// //   })
// // );

// app.use(
//   cors({
//     origin: "https://video-app-frontend-pearl.vercel.app",
//     credentials: true,
//   })
// );



// // Apply the rate limiting middleware to all requests.
// app.use(cookieParser())
// app.use("/api/auth" ,authRoutes)
// app.use("/api/users" ,userRoutes)
// app.use("/api/videos" ,videoRoutes)
// app.use("/api/comments" ,commentRoutes)

// app.get("/" , (req, res) =>{
// res.json({message: "deploy backend successful"})
// })

// app.use((err , req ,res ,next) => {
//   const status = err.status || 500
//   const message = err.message || "something went wrong"
//   return res.status(status).json({
//     success: false,
//     status,
//     message,

//   })
// })
// connectDB();

// app.listen(PORT, () => {
//   console.log(`Server is Running at  http://localhost:${PORT}`);
// });
import express from "express";
import { connectDB } from "./config/default.js";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(express.json());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// CORS Middleware
app.use(
  cors({
    origin: "https://video-app-frontend-pearl.vercel.app",
    credentials: true,
  })
);

// Cookie Parser Middleware
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({ message: "Deploy backend successful" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Connect to Database
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
