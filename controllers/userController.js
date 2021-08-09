const{body,validationResult}= require('express-validator')

module.exports.registerValiations=[
   body('name').not().isEmpty().trim().withMessage('name is required'),
   body('email').not().isEmpty().trim().withMessage('email is required'),
   body('password').isLength({min:6}).withMessage('password must be 6 character long')
];
module.exports.register= (req,res)=>{
    const {name,email,password}=req.body;
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        res.json(errors.array())
    }else{
        res.json('You have done')
    }
}