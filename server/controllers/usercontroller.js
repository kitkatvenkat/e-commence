const userschema = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userRegister = async (req,res,next) => {
    const {name,email,password,role} =req.body

    const useremail = await userschema.findOne({email})
    if(useremail) return res.status(400).json({message: "Email already exists"})
        const hashpassword = await bcrypt.hash(password,10) 
        const newUser = new userschema({name,email,password:hashpassword,role})

        const savedata = await newUser.save()
        res.json({message: "User registered successfully",  savedata})


}

const userRegisterDataGet = async(req, res , next)=>{
    try{
        const Getdata = await userschema.find()
        
        if(Getdata&&Getdata.length>0){
             // If data exists
             res.status(200).json({
                success: true,
                message: "User data fetched successfully",
                data: getData
            });
        }
        else{
            res.status(404).json({
                success: false,
                message: "No user data found"
            });
        }

    }
    catch(err){
        console.log(err);
    }
   
}

const userlogin = async(req,res,next)=>{
    const {email,password} = req.body
    const user = await userschema.findOne({email})

    if(!user) return res.status(400).json({message: "User not found"})
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch) return res.status(400).json({message: "Invalid password"})
//             const isMatch = await bcrypt.compare(password, user.password);

// if (!isMatch) {
//     return res.status(400).json({ message: "Invalid email or password" });
// }
            const token = jwt.sign({id:user._id}, process.env.SECRET_KEY, {expiresIn: '1h'})
            res.json({message: "Logged in successfully" , user, token})

}

module.exports ={userRegister,userRegisterDataGet ,userlogin}