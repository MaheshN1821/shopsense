import express from "express";
import {
  handleGetSeller,
  handleDataUpdation,
} from "../controllers/seller.controller.js";
const Router = express.Router();

Router.get("/get-details/:sellerId", handleGetSeller);

Router.post("/details-updation", handleDataUpdation);

export default Router;
