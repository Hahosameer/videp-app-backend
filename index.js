import express from "express"
import { connectDB } from "./config/default.js";
import userRoutes from './routes/users.js';
import videoRoutes from './routes/videos.js';
import commentRoutes from './routes/comments.js';
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express()

const PORT = 5000;

app.use(express.json());
app.use(
  cors({
    origin: "https://video-app-frontend-pearl.vercel.app",
    credentials: true,
  })
);



// Apply the rate limiting middleware to all requests.
app.use(cookieParser())
app.use("/api/auth" ,authRoutes)
app.use("/api/users" ,userRoutes)
app.use("/api/videos" ,videoRoutes)
app.use("/api/comments" ,commentRoutes)

app.get("/" , (req, res) =>{
res.json({message: "deploy successful"})
})

app.use((err , req ,res ,next) => {
  const status = err.status || 500
  const message = err.message || "something went wrong"
  return res.status(status).json({
    success: false,
    status,
    message,

  })
})
connectDB();

app.listen(PORT, () => {
  console.log(`Server is Running at  http://localhost:${PORT}`);
});
