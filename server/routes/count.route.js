import express from "express";
import {
  handleCartCount,
  handleWishlistCount,
} from "../controllers/count.controller.js";

const Router = express.Router();

Router.post("/cart", handleCartCount);

Router.post("/wishlist", handleWishlistCount);

export default Router;
