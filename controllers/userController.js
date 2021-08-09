const{body,validationResult}= require('express-validator');
const User=require('../models/User')
const createtoken=(user)=>{
    return jwt.sign({user},process.env.SECRET, {
        expiresIn: '7d'
    });
}
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
module.exports.registerValiations=[
   body('name').not().isEmpty().trim().withMessage('name is required'),
   body('email').not().isEmpty().trim().withMessage('email is required'),
   body('password').isLength({min:6}).withMessage('password must be 6 character long')
];
module.exports.register= async (req,res)=>{
    const {name,email,password}=req.body;
    const errors=validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
    }
    try {
        const checkUser=await User.findOne({email})
        if(checkUser){
            return res.status(400).json({errors:[{msg:"Email is already taken"}]})
        }
        const salt=await bcrypt.genSalt(10)
       const hash= await bcrypt.hash(password,salt);
        try {
            const user=await User.create({
                name,
                email,
                password: hash,
            });
           const token =createtoken(user)
            return res.status(200).json({msg:"your account has been created", token})
        } catch (error) {
            return res.status(500).json({errors:error})
        }



    } catch (error) {
        return res.status(500).json({errors:error})
    }
};
module.exports.loginValiations=[
    body('email').not().isEmpty().trim().withMessage('email is required'),
    body('password').not().isEmpty().withMessage('password is required')
 ];
module.exports.login= async (req,res)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()})
   }
   const {email,password}=req.body;
   try {
       const user=await User.findOne({email});
       if(user){
          const matched=await bcrypt.compare(password, user.password);
          if(matched){
             const token=createtoken(user);
             return res.status(200).json({msg:"you have logged in successfully", token})
          }else{
              return res.status(401).json({errors:[{msg:"Password is not correct"}]})
          }
       }else{
           return res.status(404).json({errors:[{msg:"Email not found"}]})
       }
   } catch (error) {
       return res.status(500).json({errors:error})
   }
}