import express from "express";
import {
  handlingCart,
  handleCartInfo,
  handleDeletionSingleProduct,
  handleQuantity,
  handleProductDeletion,
  handleCartConfirmation,
} from "../controllers/cart.controller.js";
const Router = express.Router();

Router.post("/", handlingCart);

Router.post("/details", handleCartInfo);

Router.post("/details/quantity", handleQuantity);

Router.post("/singleProdDelete", handleDeletionSingleProduct);

Router.post("/delete-all", handleProductDeletion);

Router.post("/order/confirmation/v1", handleCartConfirmation);

export default Router;
