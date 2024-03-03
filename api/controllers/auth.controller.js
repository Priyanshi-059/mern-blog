import User from '../models/user.model.js'
import bycryptjs from 'bcryptjs';

// this function is asynchronous because user have to signup after giving the details and it will take some time
// next is the middleware
export const signup = async(req,res,next)=>{
    const {username,email,password} = req.body;

    if(!username || !email || !password || username=== "" || email === "" || password === ""){
        return res.status(400).json({message:'All fields are required'});
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
        res.status(500).send({message: err.message});
    }
        

}