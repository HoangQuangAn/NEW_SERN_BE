const userService = require("../services/userService");

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let pass = req.body.password;
  if (!email || !pass) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing Input Parameter!",
    });
  }
  let userData = await userService.handleUserLogin(email, pass);
  // check email exist
  // compare password
  // return userInfo
  // access tokem:JWT
  return res.status(200).json({
    errCode: userData.errCode,
    errMessage: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.params.id; //ALL , id
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing Parameter",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

let handleCreateNewUsers = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};
let handleEditUsers = async (req, res) => {
  let message = await userService.handleEditUser(req.body);
  return res.status(200).json(message);
};

// delete user
let handleDeleteUsers = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Misssing required parameter!",
    });
  }
  let message = await userService.handleDeleteUser(req.body.id);
  return res.status(200).json(message);
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUsers: handleCreateNewUsers,
  handleEditUsers: handleEditUsers,
  handleDeleteUsers: handleDeleteUsers,
};
