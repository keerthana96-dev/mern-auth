import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from './config/mongodb.js';
import authRouter from "./routing/authRouter.js";
import userRouter from "./routing/userRoute.js";
import 'dotenv/config';


console.log("Loaded SENDER_EMAIL:", process.env.SENDER_EMAIL);



const app = express();
const port = process.env.PORT || 4000
connectDB();

const allowedOrigins = ['http://localhost:5173','https://mern-auth-client-delta.vercel.app']
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}))



//API end points 

app.get('/', (req, res)=> res.send("API working fine"));
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(port, ()=> console.log(`server started on port :${port}`));


