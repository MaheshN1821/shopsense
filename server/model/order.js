import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  prodId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  size: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  paymentId: {
    type: String,
  },
  dept: {
    type: String,
  },
  progress: {
    type: String,
    default: "Ordered",
  },
  img: {
    type: String,
  },
});

const Order = mongoose.model("order", orderSchema);

export default Order;
