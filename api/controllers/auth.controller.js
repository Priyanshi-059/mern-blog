import User from '../models/user.model.js'
import bycryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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
    
};    
export const signin = async (req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password || !email==="" || !password===""){
        next(errorHandler(400,'All fields are required'));
    }
    try {
        const validUser = await User.findOne({email})
        if(!validUser){
            next(errorHandler(404,'User not found'));
        }

        const validpassword = bycryptjs.compareSync(password,validUser.password);
        if(!validpassword){
            return next(errorHandler(404,'Invalid Password'));
        }
        
        // jsonwebtoken is used to authenticate the user
        const token = jwt.sign(
            {id : validUser._id}, process.env.JWT_SECRET
        ) 
// to remove the password to hide from us while signing \
        const {password : pass, ...rest} = validUser._doc;
        // rest will contain all the data except password

        res.status(200).cookie('access_token', token,
        {httpOnly:true}).json(rest);

    } catch (err) {
        next(err)
    }
}