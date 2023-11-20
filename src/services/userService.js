const db = require("../models");
import bscriptjs from "bcryptjs";
import user from "../models/user";

var salt = bscriptjs.genSaltSync(10);

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

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkuserEmail(email);
      if (isExist) {
        //user already exist
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "roleId", "password"],
          raw: true,
        });
        if (user) {
          // compare pass
          let checkPass = await bscriptjs.compareSync(password, user.password);
          if (checkPass) {
            userData.errCode = 0;
            userData.errMessage = "OK";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User not found`;
        }
        resolve(userData);
      } else {
        userData.errCode = 1;
        userData.errMessage =
          "Your email isn't exist in your system. Plz try other email";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkuserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: email,
        },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (id === "ALL") {
        users = await db.User.findAll({
          attributes: { exclude: ["password"] },
        });
      }

      if (id && id != "ALL") {
        users = await db.User.findOne({
          where: {
            id: id,
          },
          attributes: { exclude: ["password"] },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check if email exist
      let check = await checkuserEmail(data.email);
      if (check) {
        resolve({
          errCode: 1,
          message: "Your Email is already in used, pls try another email!",
        });
      }
      let hashPasswordFromBcript = await hashUserPassword(data.password);
      await db.User.create({
        firstName: data.firstName,
        password: hashPasswordFromBcript,
        lastName: data.lastName,
        email: data.email,
        address: data.address,
        gender: data.gender == "1" ? true : false,
        roleId: data.roleId,
        phoneNumber: data.phone,
      });
      resolve({
        errCode: 0,
        message: "OK",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let handleEditUser = (newUserData) => {
  //check if user exist
  return new Promise(async (resolve, reject) => {
    try {
      if (!newUserData.id) {
        resolve({
          errCode: 0,
          errMessage: "Missing required parameter!!!",
        });
      }
      let user =await db.User.findOne({
        where: {
          id: newUserData.id,
        },
        raw: false,
      });
      console.log("user",user);
      if (user) {
        user.firstName = newUserData.firstName;
        user.lastName = newUserData.lastName;
        user.email = newUserData.email;
        user.address = newUserData.address;
        user.phone = newUserData.phone;

        await user.save();
        resolve({
          errCode: 0,
          errMessage: "Update user success",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "User not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
  // update data
};
let handleDeleteUser = (userId) => {
  //check if user exist
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: {
        id: userId,
      },
    });
    console.log(user);
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: "this user is not exitst",
      });
    } else {
      try {
        await db.User.destroy({
          where: {
            id: userId,
          },
        });
      } catch (error) {
        console.log(error);
      }
      resolve({
        errCode: 0,
        errMessage: "this user is deleted",
      });
    }
  });
  // update data
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
};
