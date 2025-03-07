import mongoose from "mongoose";

const shirtSchema = new mongoose.Schema({
  img: {
    type: [String],
    required: true,
  },
  publicIds: {
    type: [String],
  },
  gender: {
    type: String,
    required: true,
  },
  size: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    // required: true,
    min: 1,
    max: 5,
    default: 4.2,
  },
  brandName: {
    type: String,
    required: true,
  },
  prodDesc: {
    type: String,
    required: true,
  },
  prodInfo: {
    type: [String],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  offPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  dept: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  prodId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

shirtSchema.set("toJSON", { virtuals: true });
shirtSchema.set("toObject", { virtuals: true });

shirtSchema.virtual("offer").get(function () {
  return this.price > 0
    ? Math.round(((this.price - this.offPrice) / this.price) * 100)
    : 0;
});

const shirt = mongoose.model("shirt", shirtSchema);

const tshirtSchema = new mongoose.Schema({
  img: {
    type: [String],
    required: true,
  },
  publicIds: {
    type: [String],
  },
  gender: {
    type: String,
    required: true,
  },
  size: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    // required: true,
    min: 1,
    max: 5,
    default: 4.2,
  },
  brandName: {
    type: String,
    required: true,
  },
  prodDesc: {
    type: String,
    required: true,
  },
  prodInfo: {
    type: [String],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  offPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  dept: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  prodId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

tshirtSchema.set("toJSON", { virtuals: true });
tshirtSchema.set("toObject", { virtuals: true });

tshirtSchema.virtual("offer").get(function () {
  return this.price > 0
    ? Math.round(((this.price - this.offPrice) / this.price) * 100)
    : 0;
});

const tshirt = mongoose.model("tshirt", tshirtSchema);

const pantSchema = new mongoose.Schema({
  img: {
    type: [String],
    required: true,
  },
  publicIds: {
    type: [String],
  },
  gender: {
    type: String,
    required: true,
  },
  size: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    // required: true,
    min: 1,
    max: 5,
    default: 4.2,
  },
  brandName: {
    type: String,
    required: true,
  },
  prodDesc: {
    type: String,
    required: true,
  },
  prodInfo: {
    type: [String],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  offPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  dept: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  prodId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

pantSchema.set("toJSON", { virtuals: true });
pantSchema.set("toObject", { virtuals: true });

pantSchema.virtual("offer").get(function () {
  return this.price > 0
    ? Math.round(((this.price - this.offPrice) / this.price) * 100)
    : 0;
});

const pant = mongoose.model("pant", pantSchema);

const clothingPostSchema = new mongoose.Schema({
  img: {
    type: [String],
    required: true,
  },
  publicIds: {
    type: [String],
  },
  for: {
    type: String,
    required: true,
  },
  prodType: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    // required: true,
    min: 1,
    max: 5,
    default: 4.2,
  },
  brandName: {
    type: String,
    required: true,
  },
  prodDesc: {
    type: String,
    required: true,
  },
  prodInfo: {
    type: [String],
  },
  size: {
    type: [String],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  offPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  dept: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  prodId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

clothingPostSchema.set("toJSON", { virtuals: true });
clothingPostSchema.set("toObject", { virtuals: true });

clothingPostSchema.virtual("offer").get(function () {
  return this.price > 0
    ? Math.round(((this.price - this.offPrice) / this.price) * 100)
    : 0;
});

const clothing = mongoose.model("clothing", clothingPostSchema);

const watchesPostSchema = new mongoose.Schema({
  img: {
    type: [String],
    required: true,
  },
  publicIds: {
    type: [String],
  },
  for: {
    type: String,
    required: true,
  },
  size: {
    type: [String],
  },
  watchType: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    // required: true,
    min: 1,
    max: 5,
    default: 4.2,
  },
  brandName: {
    type: String,
    required: true,
  },
  prodDesc: {
    type: String,
    required: true,
  },
  prodInfo: {
    type: [String],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  offPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  dept: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  prodId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

watchesPostSchema.set("toJSON", { virtuals: true });
watchesPostSchema.set("toObject", { virtuals: true });

watchesPostSchema.virtual("offer").get(function () {
  return this.price > 0
    ? Math.round(((this.price - this.offPrice) / this.price) * 100)
    : 0;
});

const watches = mongoose.model("watches", watchesPostSchema);

const booksPostSchema = new mongoose.Schema({
  img: {
    type: [String],
    required: true,
  },
  publicIds: {
    type: [String],
  },
  bookType: {
    type: String,
    required: true,
  },
  prodInfo: {
    type: [String],
  },
  rating: {
    type: Number,
    // required: true,
    min: 1,
    max: 5,
    default: 4.2,
  },
  brandName: {
    type: String,
    required: true,
  },
  prodDesc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  offPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  dept: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  prodId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

booksPostSchema.set("toJSON", { virtuals: true });
booksPostSchema.set("toObject", { virtuals: true });

booksPostSchema.virtual("offer").get(function () {
  return this.price > 0
    ? Math.round(((this.price - this.offPrice) / this.price) * 100)
    : 0;
});

const books = mongoose.model("books", booksPostSchema);

const eyeWearPostSchema = new mongoose.Schema({
  img: {
    type: [String],
    required: true,
  },
  publicIds: {
    type: [String],
  },
  for: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    // required: true,
    min: 1,
    max: 5,
    default: 4.2,
  },
  brandName: {
    type: String,
    required: true,
  },
  prodDesc: {
    type: String,
    required: true,
  },
  prodInfo: {
    type: [String],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  offPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  dept: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  prodId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

eyeWearPostSchema.set("toJSON", { virtuals: true });
eyeWearPostSchema.set("toObject", { virtuals: true });

eyeWearPostSchema.virtual("offer").get(function () {
  return this.price > 0
    ? Math.round(((this.price - this.offPrice) / this.price) * 100)
    : 0;
});

const eyeWear = mongoose.model("eyeWear", eyeWearPostSchema);

const footWearPostSchema = new mongoose.Schema({
  img: {
    type: [String],
    required: true,
  },
  publicIds: {
    type: [String],
  },
  for: {
    type: String,
    required: true,
  },
  size: {
    type: [String],
    required: true,
  },
  footWearType: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4.2,
  },
  brandName: {
    type: String,
    required: true,
  },
  prodDesc: {
    type: String,
    required: true,
  },
  prodInfo: {
    type: [String],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  offPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  dept: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  prodId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

footWearPostSchema.set("toJSON", { virtuals: true });
footWearPostSchema.set("toObject", { virtuals: true });

footWearPostSchema.virtual("offer").get(function () {
  return this.price > 0
    ? Math.round(((this.price - this.offPrice) / this.price) * 100)
    : 0;
});

const footWear = mongoose.model("footWear", footWearPostSchema);

export { clothing, watches, books, eyeWear, footWear, shirt, tshirt, pant };
