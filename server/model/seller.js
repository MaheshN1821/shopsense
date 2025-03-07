import mongoose from "mongoose";

const sellerDetailsSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
  },
  businessType: {
    type: String,
    required: true,
  },
  gstNum: {
    type: String,
    required: true,
  },
  panNum: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
  },
  businessAddress: {
    type: String,
  },
});

const sellerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  onboard: {
    type: Boolean,
    default: false,
  },
  sellerInfo: {
    type: sellerDetailsSchema,
  },
  refreshToken: {
    type: String,
  },
});

const seller = mongoose.model("seller", sellerSchema);

export { seller };
