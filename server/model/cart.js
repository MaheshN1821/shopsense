import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  cartImage: {
    type: [String],
    required: true,
  },
  cartRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  cartBrandName: {
    type: String,
    required: true,
  },
  cartProdDesc: {
    type: String,
    required: true,
  },
  cartPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  cartOffPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  cartOffer: {
    type: Number,
  },
  size: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  prodId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  dept: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  totalAvailable: {
    type: Number,
  },
});

const cart = mongoose.model("cart", cartSchema);

export default cart;
