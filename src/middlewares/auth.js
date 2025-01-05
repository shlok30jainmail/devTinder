
// if we are not using err so dont use it in routing otherwise it will give error
// middlewares
const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const adminAuthorization = token === "xyz";
    if(!adminAuthorization){
        res.status(501).send("You are not a admin so you can't");
    }else{
        next();
    }
}

const userAuth = (req,res,next)=>{
    const token = "xyz";
    const isUserAuthorization = token === "xyz";
    if(!isUserAuthorization){
        res.status(501).send("You are not a vaild user so you can't");
    }else{
        next();
    }
}

module.exports={
    adminAuth,
    userAuth,
}