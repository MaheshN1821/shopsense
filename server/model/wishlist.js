import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
  wishlistImage: {
    type: [String],
    required: true,
  },
  wishlistRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  wishlistBrandName: {
    type: String,
    required: true,
  },
  wishlistProdDesc: {
    type: String,
    required: true,
  },
  wishlistPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  wishlistOffPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  wishListOffer: {
    type: Number,
  },
  usrID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  prodID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
  wishListFor: {
    type: String,
  },
  wishListProdType: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  size: {
    type: [String],
  },
  prodInfo: {
    type: [String],
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const wishList = mongoose.model("wishlist", wishListSchema);

export default wishList;
