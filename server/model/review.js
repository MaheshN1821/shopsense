import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  prodId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  review: {
    type: String,
  },
  rate: {
    type: String,
  },
  userName: {
    type: String,
  },
});

const Review = mongoose.model("review", reviewSchema);

export default Review;
