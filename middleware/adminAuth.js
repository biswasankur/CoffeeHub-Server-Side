const jwt=require('jsonwebtoken');

exports.adminjwt=(req,res,next)=>{
    if (req.cookies && req.cookies.AdminToken) {
        jwt.verify(req.cookies.AdminToken,'coffeeshop@2023',(err,data)=>{
            req.admin=data
            next();
        })
    }else{
        next();
    }
}