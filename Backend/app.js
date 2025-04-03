


import express, { json } from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';
import connetDB from './database/dbConnect.js';
import { router as userRoutes } from './routes/userRoutes.js';
import { router as taskRoutes } from './routes/taskRoutes.js';

//   To load Environment variable
dotenv.config();
const app = express();

connetDB();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 


app.use(cors({
    origin:  ['http://localhost:5173'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));



app.get("/", (req,res)=>{
    res.send("Server is running");
})


//  Routes
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

// app.listen(PORT, ()=>{
//     console.log(`Server is litening on http://localhost:${PORT}`);
// })


export default app;