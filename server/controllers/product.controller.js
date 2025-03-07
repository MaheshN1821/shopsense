import {
  books,
  clothing,
  eyeWear,
  footWear,
  pant,
  shirt,
  tshirt,
  watches,
} from "../model/post.js";
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// import mongoose from "mongoose";
// import { ObjectId } from "mongodb";
// import axios from "axios";
// import { seller } from "../model/seller.js";

const ClothingInfo = async (req, res) => {
  try {
    const result1 = await pant.find();
    const result2 = await shirt.find();
    const result3 = await tshirt.find();
    const result4 = await clothing.find();
    const result = [...result1, ...result2, ...result3, ...result4];
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Cannot load product details!" });
  }
};

const filteredClothingInfo = async (req, res) => {
  try {
    const data = req.body;

    const trueKeys = Object.entries(data)
      .filter(([key, value]) => value === true)
      .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1).toLowerCase());

    console.log(trueKeys);

    if (trueKeys.length === 0) {
      trueKeys.push(
        "men",
        "women",
        "boy",
        "girl",
        "shirt",
        "tshirt",
        "pant",
        "Men",
        "Women",
        "Boy",
        "Girl"
      );
    }

    const containsAtleastOneGender = [
      "men",
      "women",
      "boy",
      "girl",
      "Men",
      "Women",
      "Boy",
      "Girl",
    ].some((key) => trueKeys.includes(key));

    if (!containsAtleastOneGender) {
      trueKeys.push(
        "men",
        "women",
        "boy",
        "girl",
        "Men",
        "Women",
        "Boy",
        "Girl"
      );
    }

    const containsAtleastOneCateg = [
      "shirt",
      "tshirt",
      "pant",
      "Shirt",
      "Tshirt",
      "Pant",
    ].some((key) => trueKeys.includes(key));

    if (!containsAtleastOneCateg) {
      trueKeys.push("shirt", "tshirt", "pant", "Shirt", "Tshirt", "Pant");
    }

    const sortOrder = data.asc ? 1 : data.desc ? -1 : 1;
    let min = data.minprice === "" ? 0 : data.minprice;
    min = parseInt(min);
    let max = parseInt(data.maxprice);

    const result1 = await clothing
      .find({
        for: { $in: trueKeys },
        prodType: { $in: trueKeys },
        price: { $gte: min, $lte: max },
      })
      .sort({ price: sortOrder });

    let result2 = [];
    let result3 = [];
    let result4 = [];

    if (trueKeys.includes("Pant")) {
      result2 = await pant
        .find({
          gender: { $in: trueKeys },
          price: { $gte: min, $lte: max },
        })
        .sort({ price: sortOrder });
    }
    if (trueKeys.includes("Shirt")) {
      result3 = await shirt
        .find({
          gender: { $in: trueKeys },
          price: { $gte: min, $lte: max },
        })
        .sort({ price: sortOrder });
    }
    if (trueKeys.includes("Tshirt")) {
      result4 = await tshirt
        .find({
          gender: { $in: trueKeys },
          price: { $gte: min, $lte: max },
        })
        .sort({ price: sortOrder });
    }

    const result = [...result1, ...result2, ...result3, ...result4];

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Cannot load product details!" });
  }
};

const watchInfo = async (req, res) => {
  try {
    const result = await watches.find().sort({ price: 1 });
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Cannot load product details!" });
  }
};

const filteredWatchData = async (req, res) => {
  try {
    const data = req.body;

    const trueKeys = Object.entries(data)
      .filter(([key, value]) => value === true)
      .map(([key]) => key);

    if (trueKeys.length === 0) {
      trueKeys.push("men", "women", "boy", "girl", "analogue", "smartwatch");
    }

    const containsAtleastOneGender = ["men", "women", "boy", "girl"].some(
      (key) => trueKeys.includes(key)
    );

    if (!containsAtleastOneGender) {
      trueKeys.push("men", "women", "boy", "girl");
    }

    const containsAtleastOneCateg = ["analogue", "smartwatch"].some((key) =>
      trueKeys.includes(key)
    );

    if (!containsAtleastOneCateg) {
      trueKeys.push("analogue", "smartwatch");
    }

    const sortOrder = data.asc ? 1 : data.desc ? -1 : 1;
    let min = data.minprice === "" ? 0 : data.minprice;
    min = parseInt(min);
    let max = parseInt(data.maxprice);

    const result = await watches
      .find({
        for: { $in: trueKeys },
        watchType: { $in: trueKeys },
        price: { $gte: min, $lte: max },
      })
      .sort({ price: sortOrder });

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Cannot load product details!" });
  }
};

const bookInfo = async (req, res) => {
  try {
    const result = await books.find();
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Cannot load product details!" });
  }
};

const filteredBookData = async (req, res) => {
  try {
    const data = req.body;

    const trueKeys = Object.entries(data)
      .filter(([key, value]) => value === true)
      .map(([key]) => key);

    if (trueKeys.length === 0) {
      trueKeys.push("fiction", "nonFiction");
    }

    const sortOrder = data.asc ? 1 : data.desc ? -1 : 1;
    let min = data.minprice === "" ? 0 : data.minprice;
    min = parseInt(min);
    let max = parseInt(data.maxprice);

    const result = await books
      .find({
        bookType: { $in: trueKeys },
        price: { $gte: min, $lte: max },
      })
      .sort({ price: sortOrder });

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Cannot load product details!" });
  }
};

const eyeWearInfo = async (req, res) => {
  try {
    const result = await eyeWear.find();
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Cannot load product details!" });
  }
};

const filteredEyeWearInfo = async (req, res) => {
  try {
    const data = req.body;

    const trueKeys = Object.entries(data)
      .filter(([key, value]) => value === true)
      .map(([key]) => key);

    if (trueKeys.length === 0) {
      trueKeys.push("men", "women", "boy", "girl");
    }

    const containsAtleastOneGender = ["men", "women", "boy", "girl"].some(
      (key) => trueKeys.includes(key)
    );

    if (!containsAtleastOneGender) {
      trueKeys.push("men", "women", "boy", "girl");
    }

    const sortOrder = data.asc ? 1 : data.desc ? -1 : 1;
    let min = data.minprice === "" ? 0 : data.minprice;
    min = parseInt(min);
    let max = parseInt(data.maxprice);
    const result = await eyeWear
      .find({
        for: { $in: trueKeys },
        price: { $gte: min, $lte: max },
      })
      .sort({ price: sortOrder });

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Cannot load product details!" });
  }
};

const footWearInfo = async (req, res) => {
  try {
    const result = await footWear.find();
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Cannot load product details!" });
  }
};

const filteredFootWearInfo = async (req, res) => {
  try {
    const data = req.body;

    const trueKeys = Object.entries(data)
      .filter(([key, value]) => value === true)
      .map(([key]) => key);

    if (trueKeys.length === 0) {
      trueKeys.push(
        "men",
        "women",
        "boy",
        "girl",
        "casual",
        "sneaker",
        "sandal"
      );
    }

    const containsAtleastOneGender = ["men", "women", "boy", "girl"].some(
      (key) => trueKeys.includes(key)
    );

    if (!containsAtleastOneGender) {
      trueKeys.push("men", "women", "boy", "girl");
    }

    const containsAtleastOneCateg = ["casual", "sneaker", "sandal"].some(
      (key) => trueKeys.includes(key)
    );

    if (!containsAtleastOneCateg) {
      trueKeys.push("casual", "sneaker", "sandal");
    }

    const sortOrder = data.asc ? 1 : data.desc ? -1 : 1;
    let min = data.minprice === "" ? 0 : data.minprice;
    min = parseInt(min);
    let max = parseInt(data.maxprice);
    const result = await footWear
      .find({
        for: { $in: trueKeys },
        footWearType: { $in: trueKeys },
        price: { $gte: min, $lte: max },
      })
      .sort({ price: sortOrder });

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Cannot load product details!" });
  }
};

const handleShirtUpload = async (req, res) => {
  try {
    const data = req.body;

    const newShirt = new shirt({
      img: data.img,
      size: data.size,
      publicIds: data.publicIds,
      prodInfo: data.prodInfo,
      gender: data.gender,
      brandName: data.brandName || "New Look",
      prodDesc: data.prodDesc || "Description is being updated!",
      price: Number(data.price),
      offPrice: Number(data.offPrice),
      dept: data.dept,
      quantity: Number(data.quantity) || 1,
      sellerId: data.sellerId,
    });

    const result = await newShirt.save();

    if (result) {
      return res.status(201).json({ message: "Data Uploaded!", data: result });
    } else {
      return res
        .status(500)
        .json({ error: "Unable to upload Shirt Data, Try again Later!" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleTShirtUpload = async (req, res) => {
  try {
    const data = req.body;

    const newTShirt = new tshirt({
      img: data.img,
      size: data.size,
      publicIds: data.publicIds,
      prodInfo: data.prodInfo,
      gender: data.gender,
      brandName: data.brandName || "New Look",
      prodDesc: data.prodDesc || "Description is being updated!",
      price: Number(data.price),
      offPrice: Number(data.offPrice),
      dept: data.dept,
      quantity: Number(data.quantity) || 1,
      sellerId: data.sellerId,
    });

    const result = await newTShirt.save();

    if (result) {
      return res.status(201).json({ message: "Data Uploaded!", data: result });
    } else {
      return res
        .status(500)
        .json({ error: "Unable to upload Shirt Data, Try again Later!" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handlePantUpload = async (req, res) => {
  try {
    const data = req.body;

    const newPant = new pant({
      img: data.img,
      size: data.size,
      publicIds: data.publicIds,
      prodInfo: data.prodInfo,
      gender: data.gender,
      brandName: data.brandName || "New Look",
      prodDesc: data.prodDesc || "Description is being updated!",
      price: Number(data.price),
      offPrice: Number(data.offPrice),
      dept: data.dept,
      quantity: Number(data.quantity) || 1,
      sellerId: data.sellerId,
    });

    const result = await newPant.save();

    if (result) {
      return res.status(201).json({ message: "Data Uploaded!", data: result });
    } else {
      return res
        .status(500)
        .json({ error: "Unable to upload Shirt Data, Try again Later!" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleGenUpload = async (req, res) => {
  try {
    const data = req.body;

    const newDress = new clothing({
      img: data.img,
      size: data.size,
      publicIds: data.publicIds,
      prodInfo: data.prodInfo,
      prodType: data.prodType,
      for: data.for,
      brandName: data.brandName || "New Look",
      prodDesc: data.prodDesc || "Description is being updated!",
      price: Number(data.price),
      offPrice: Number(data.offPrice),
      dept: data.dept,
      quantity: Number(data.quantity) || 1,
      sellerId: data.sellerId,
    });

    const result = await newDress.save();

    if (result) {
      return res.status(201).json({ message: "Data Uploaded!", data: result });
    } else {
      return res
        .status(500)
        .json({ error: "Unable to upload Shirt Data, Try again Later!" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleBooksUpload = async (req, res) => {
  try {
    const data = req.body;

    const newBook = new books({
      publicIds: data.publicIds,
      bookType: data.bookType,
      brandName: data.brandName || "New Look",
      prodDesc: data.prodDesc || "Description is being updated!",
      prodInfo: data.prodInfo,
      price: Number(data.price),
      offPrice: Number(data.offPrice),
      dept: data.dept,
      quantity: Number(data.quantity) || 1,
      img: data.img,
      sellerId: data.sellerId,
    });

    const result = await newBook.save();

    if (result) {
      return res.status(201).json({ message: "Data Uploaded!", data: result });
    } else {
      return res
        .status(500)
        .json({ error: "Unable to upload Shirt Data, Try again Later!" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleFootWearUpload = async (req, res) => {
  try {
    const data = req.body;

    const newFootWear = new footWear({
      for: data.for,
      publicIds: data.publicIds,
      footWearType: data.footWearType,
      size: data.size,
      brandName: data.brandName || "New Look",
      prodDesc: data.prodDesc || "Description is being updated!",
      prodInfo: data.prodInfo,
      price: Number(data.price),
      offPrice: Number(data.offPrice),
      dept: data.dept,
      quantity: Number(data.quantity) || 1,
      img: data.img,
      sellerId: data.sellerId,
    });

    const result = await newFootWear.save();

    if (result) {
      return res.status(201).json({ message: "Data Uploaded!", data: result });
    } else {
      return res
        .status(500)
        .json({ error: "Unable to upload Shirt Data, Try again Later!" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleEyeWearUpload = async (req, res) => {
  try {
    const data = req.body;

    const newEyeWear = new eyeWear({
      for: data.for,
      publicIds: data.publicIds,
      brandName: data.brandName || "New Look",
      prodDesc: data.prodDesc || "Description is being updated!",
      prodInfo: data.prodInfo,
      price: Number(data.price),
      offPrice: Number(data.offPrice),
      dept: data.dept,
      quantity: Number(data.quantity) || 1,
      img: data.img,
      sellerId: data.sellerId,
    });

    const result = await newEyeWear.save();

    if (result) {
      return res.status(201).json({ message: "Data Uploaded!", data: result });
    } else {
      return res
        .status(500)
        .json({ error: "Unable to upload Shirt Data, Try again Later!" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleWatchesUpload = async (req, res) => {
  try {
    const data = req.body;

    const newWatch = new watches({
      for: data.for,
      publicIds: data.publicIds,
      watchType: data.watchType,
      size: data.size,
      brandName: data.brandName || "New Look",
      prodDesc: data.prodDesc || "Description is being updated!",
      prodInfo: data.prodInfo,
      price: Number(data.price),
      offPrice: Number(data.offPrice),
      dept: data.dept,
      quantity: Number(data.quantity) || 1,
      img: data.img,
      sellerId: data.sellerId,
    });

    const result = await newWatch.save();

    if (result) {
      return res.status(201).json({ message: "Data Uploaded!", data: result });
    } else {
      return res
        .status(500)
        .json({ error: "Unable to upload Shirt Data, Try again Later!" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleGetSellerEnteredProdDetails = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const objectId = sellerId;

    const clothingData = await clothing.find({ sellerId: objectId });
    const shirtData = await shirt.find({ sellerId: objectId });
    const tshirtData = await tshirt.find({ sellerId: objectId });
    const pantData = await pant.find({ sellerId: objectId });
    const bookData = await books.find({ sellerId: objectId });
    const footWearData = await footWear.find({ sellerId: objectId });
    const eyeWearData = await eyeWear.find({ sellerId: objectId });
    const watchData = await watches.find({ sellerId: objectId });

    const finalData = {
      clothingData,
      shirtData,
      tshirtData,
      pantData,
      bookData,
      footWearData,
      eyeWearData,
      watchData,
    };

    res.status(200).json({ finalData });
  } catch (err) {
    console.error("Error fetching seller products:", err);
    res.status(500).json({ error: "Try again later!" });
  }
};

const handleDataDelete = async (req, res) => {
  const data = req.body;

  if (
    !data.sellerId ||
    !data.prodId ||
    !data.publicIds ||
    !Array.isArray(data.publicIds)
  ) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  try {
    const db =
      data.dept === "watch"
        ? watches
        : data.dept === "footwear"
        ? footWear
        : data.dept === "eyewear"
        ? eyeWear
        : data.dept === "books"
        ? books
        : data.dept === "shirt"
        ? shirt
        : data.dept === "tshirt"
        ? tshirt
        : data.dept === "pant"
        ? pant
        : clothing;

    const value = await db.findOneAndDelete({
      sellerId: data.sellerId,
      _id: data.prodId,
    });

    if (!value) {
      return res.status(404).json({ error: "Product not found" });
    }

    await Promise.all(
      data.publicIds.map((pId) => cloudinary.uploader.destroy(pId))
    );

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later" });
  }
};

export {
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
};
