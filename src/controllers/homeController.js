import crudService from "../services/crudService";
const db = require("../models");

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("home.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let letCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await crudService.createNewUser(req.body);
  return res.send("post crud from server ");
};
let displayGetCRUD = async (req, res) => {
  let data = await crudService.getAllUsers();
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let getEditUser = async (req,res)=>{
  let userId=req.query.id;
  if(userId){
    let userData= await crudService.getUserById(userId)
    return res.render('editCRUD.ejs',{
      userData:userData
    });
  }
  else{
    return res.send('User not found!!!');
  }
}

let putUser=async (req,res)=>{
  let data= req.body;
  let alluser = await crudService.updateUserData(data);
  return res.render("displayCRUD.ejs", {
    dataTable: alluser,
  });
}

let deleteUser=async (req,res)=>{
  let userId=req.query.id;
  let alluser = await crudService.deleteUserService(userId);
  return res.render("displayCRUD.ejs", {
    dataTable: alluser,
  });
}
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  letCRUD: letCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditUser:getEditUser,
  putUser:putUser,
  deleteUser:deleteUser,
};
