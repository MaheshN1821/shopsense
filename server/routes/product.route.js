import express from "express";
import {
  ClothingInfo,
  filteredClothingInfo,
  watchInfo,
  filteredWatchData,
  bookInfo,
  filteredBookData,
  eyeWearInfo,
  filteredEyeWearInfo,
  footWearInfo,
  filteredFootWearInfo,
  handleShirtUpload,
  handleTShirtUpload,
  handlePantUpload,
  handleGenUpload,
  handleBooksUpload,
  handleFootWearUpload,
  handleEyeWearUpload,
  handleWatchesUpload,
  handleGetSellerEnteredProdDetails,
  handleDataDelete,
} from "../controllers/product.controller.js";
import {
  handleWishList,
  handleWishListFromDetails,
  removeWishListProd,
  wishListInfo,
} from "../controllers/wishlist.controller.js";

const Router = express.Router();

Router.get("/clothing", ClothingInfo);

Router.post("/clothing", filteredClothingInfo);

Router.post("/clothing/shirt", handleShirtUpload);

Router.post("/clothing/tshirt", handleTShirtUpload);

Router.post("/clothing/pant", handlePantUpload);

Router.post("/clothing/gen", handleGenUpload);

Router.get("/watches", watchInfo);

Router.post("/watches", filteredWatchData);

Router.post("/add/watches", handleWatchesUpload);

Router.get("/books", bookInfo);

Router.post("/books", filteredBookData);

Router.post("/add/books", handleBooksUpload);

Router.get("/eyewear", eyeWearInfo);

Router.post("/eyewear", filteredEyeWearInfo);

Router.post("/add/eyewear", handleEyeWearUpload);

Router.get("/footwear", footWearInfo);

Router.post("/footwear", filteredFootWearInfo);

Router.post("/add/footwear", handleFootWearUpload);

Router.post("/wishlist", handleWishList);

Router.post("/wishlist/products-page", handleWishListFromDetails);

Router.post("/wishlist/details", wishListInfo);

Router.post("/wishlist/delete", removeWishListProd);

Router.get("/all-details/:sellerId", handleGetSellerEnteredProdDetails);

Router.post("/data/delete", handleDataDelete);

export default Router;
