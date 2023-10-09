const db = require("../models");
import bcrypt from "bcryptjs";

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
          raw:true
        });
        if (user) {
          // compare pass
          let checkPass = await bcrypt.compareSync(password, user.password);
          if (checkPass) {
            userData.errCode = 0;
            userData.errMessage = "OK";
            delete user.password
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

module.exports = {
  handleUserLogin: handleUserLogin,
};
