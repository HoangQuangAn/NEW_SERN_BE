const userService = require("../services/userService");

let handleLogin=async (req,res)=>{
    let email=req.body.email
    let pass = req.body.password
    if(!email || !pass){
        return res.status(500).json({
            errCode:1,
            message:'Missing Input Parameter!'
        })
    }
    let userData=await userService.handleUserLogin(email,pass)
    // check email exist 
    // compare password
    // return userInfo
    // access tokem:JWT
    return res.status(200).json({
        errCode:userData.errCode,
        errMessage:userData.errMessage,
        user:userData.user?userData.user:{}
    })
};

module.exports = {
    handleLogin:handleLogin
};
  