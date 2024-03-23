import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

mongoose.connect('mongodb+srv://priyanshi:priyanshi@mern-blog.jsubdwu.mongodb.net/?retryWrites=true&w=majority&appName=mern-blog')
.then(()=>{
    console.log("Connection successful");
}).catch((err)=>{
    console.log(err);
})

const app = express();

// we install this because we cannot use .env in backend
dotenv.config();




// this will allow json input to the backend 
app.use(express.json());



app.use(cookieParser());

app.listen(3000,()=>{
    console.log(`Server is listen on port no 3000`);
});

app.use('/api/user',userRoutes)

app.use('/api/auth',authRoutes)

// use middleware to add a function and handle the error
// next means whenever we want to move to next middleware it will help out
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });