import bscriptjs from "bcryptjs";
import db from "../models";
var salt = bscriptjs.genSaltSync(10);
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcript = await hashUserPassword(data.password);
      await db.User.create(
        {
          firstName: data.firstName,
          password: hashPasswordFromBcript,
          lastName: data.lastName,
          email: data.email,
          address:data.address,
          gender:data.gender=='1'?true:false,
          roleId:data.roleId,
          phoneNumber:data.phone,
        }
      );
      resolve('ok create new user success!!!');
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hash = await bscriptjs.hashSync(password, salt);
      resolve(hash);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers=()=>{
  return new Promise(async(resolve, reject)=>{
    try{
      let users =db.User.findAll({ raw: true })
      resolve(users)
    }catch(e){
      reject(e)
    }
  })
}

let getUserById=(id)=>{
  return new Promise(async (resolve, reject)=>{
    try {
      let user = await db.User.findOne({
        where:{id:id},
        raw:true
      })
      if(user){
        resolve(user)
      }else{
        resolve({})
      }
    } catch (error) {
      reject(error)
    }
  });
}

let updateUserData=(data)=>{
  return new Promise(async (resolve, reject)=>{
    try {
      let user = await db.User.findOne({
        where:{id:data.id}
      })
      console.log(user);
      if(user){
        user.firstName=data.firstName;
        user.lastName=data.lastName;
        user.email=data.email;
        user.phone=data.phone;
        user.address=data.address;
        await user.save();
        let allUsers = await db.User.findAll();
        resolve(allUsers);
      }else{
        resolve()
      }
    } catch (error) {
      reject(error)
    }
  });
}

let deleteUserService=(id)=>{
  return new Promise(async (resolve, reject)=>{
    try {
      let user = await db.User.findOne({
        where:{id:id}
      })
      if(user){
        await user.destroy();
        let allUsers = await db.User.findAll();
        resolve(allUsers);
      }else{
        resolve()
      }
    } catch (error) {
      reject(error)
    }
  });
}
module.exports = {
  createNewUser: createNewUser,
  getAllUsers:getAllUsers,
  getUserById:getUserById,
  updateUserData:updateUserData,
  deleteUserService:deleteUserService
};
