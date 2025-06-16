// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import connectDB from './config/mongodb.js';
// import authRouter from "./routing/authRouter.js";
// import userRouter from "./routing/userRoute.js";
// import 'dotenv/config';


// console.log("Loaded SENDER_EMAIL:", process.env.SENDER_EMAIL);



// const app = express();
// const port = process.env.PORT || 4000
// connectDB();

// const allowedOrigins = ['http://localhost:5173']
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({origin: allowedOrigins, credentials: true}))



// //API end points 

// app.get('/', (req, res)=> res.send("API working fine"));
// app.use('/api/auth', authRouter)
// app.use('/api/user', userRouter)

// app.listen(port, ()=> console.log(`server started on port :${port}`));


// export default server;


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from './config/mongodb.js';
import authRouter from "./routing/authRouter.js";
import userRouter from "./routing/userRoute.js";
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 4000;

// ✅ Connect to MongoDB
connectDB();

// ✅ CORS: allow both localhost and deployed frontend
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-frontend.vercel.app'  // Replace with your actual Vercel frontend URL
];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// ✅ Routes
app.get('/', (req, res) => res.send("API working fine ✅"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get("/api/status", (req, res) => {
  res.send("✅ Server is live and responding");
});

// ✅ Start server only in development
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => console.log(`Server started on port: ${port}`));
}

// ✅ Export for Vercel
export default app;
