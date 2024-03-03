import User from '../models/user.model.js'
import bycryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

// this function is asynchronous because user have to signup after giving the details and it will take some time
// next is the middleware
export const signup = async(req,res,next)=>{
    const {username,email,password} = req.body;

    if(!username || !email || !password || username=== "" || email === "" || password === ""){
        return next(errorHandler(400,"All fields are reqired"));
    }

    const hashedpassword = bycryptjs.hashSync(password,10);

    const newUser = new User(
        {
            username,
            email,
            password:hashedpassword,
        }
    );

    try {
        await newUser.save();
        res.json("SignUp successful");
        
    } catch (err) {
        next(err);
    }
        

}