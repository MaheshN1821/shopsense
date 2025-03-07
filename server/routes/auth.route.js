import express from "express";
// import verifyJWT from "../middleware/verifyJWT.js";
import {
  registerController,
  loginController,
  logoutController,
  smsController,
  sellerRegisterController,
  sellerLoginController,
  sellerOnBoardController,
} from "../controllers/auth.controller.js";
const Router = express.Router();

Router.post("/sms", smsController);

Router.post("/verify-otp");

Router.post("/register", registerController);

Router.post("/login", loginController);

Router.get("/logout", logoutController);

Router.post("/seller/register", sellerRegisterController);

Router.post("/seller/login", sellerLoginController);

Router.post("/seller/onboard", sellerOnBoardController);

export default Router;
