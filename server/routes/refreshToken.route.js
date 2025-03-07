import express from "express";
import refreshTokenController from "../controllers/refreshToken.controller.js";
const Router = express.Router();

Router.get("/", refreshTokenController);

export default Router;
