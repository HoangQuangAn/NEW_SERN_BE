import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();
let initWebRoute = (app) => {
  

  router.get("/hoidanit", (req, res) => {
    return res.send("Hello world with Hoi Dan It ");
  });

  router.get("/controller", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.letCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.post("/edit-user", homeController.getEditUser);
  router.post("/put-crud", homeController.putUser);
  router.post("/delete-user", homeController.deleteUser);

  //==================================================
  router.post("/api/login", userController.handleLogin);

  return app.use("/", router);
};

module.exports = initWebRoute;
