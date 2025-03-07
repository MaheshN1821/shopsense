import cart from "../model/cart.js";
import Order from "../model/order.js";
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

const handlingCart = async (req, res) => {
  const data = req.body;

  const cartData = {
    cartImage: data.img,
    cartRating: data.rating,
    cartBrandName: data.brandName,
    cartProdDesc: data.prodDesc,
    cartPrice: data.price,
    cartOffPrice: data.offPrice,
    cartOffer: data.offer,
    size: data.size,
    userId: data.userId,
    prodId: data.prodId ? data.prodId : data.id,
    dept: data.dept,
    totalAvailable: data.quantity,
    quantity: 1,
    sellerId: data.sellerId,
  };

  try {
    const productToCart = await cart.create({ ...cartData });
    await productToCart.save();

    res.status(200).json({ message: "Product added to Cart Successfully!" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Cannot add the product to cart!Try again later" });
  }
};

const handleCartInfo = async (req, res) => {
  try {
    const id = req.body.userId;

    const response = await cart.find({ userId: id });

    res.status(200).json({ response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Cannot get card Data!" });
  }
};

const handleDeletionSingleProduct = async (req, res) => {
  try {
    const uId = req.body.userId;
    const pId = req.body.prodId;

    const response = await cart.deleteOne({ userId: uId, prodId: pId });

    res.status(200).json({ message: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Cannot delete the product!" });
  }
};

const handleProductDeletion = async (req, res) => {
  const { id } = req.body;
  try {
    const response = await cart.deleteMany({ userId: id });

    res.status(200).json({ message: "Success!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later!" });
  }
};

const handleQuantity = async (req, res) => {
  const { quant, dept, userId, prodId } = req.body;
  try {
    const response = await cart.findOneAndUpdate(
      { userId: userId, prodId: prodId },
      { $set: { quantity: quant } },
      { new: true }
    );

    res.status(200).json({ message: "Update Successful!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Cannot update the product quantity!" });
  }
};

const handleCartConfirmation = async (req, res) => {
  const data = req.body;
  // console.log(data);

  try {
    const result = await Order.create({ ...data });

    const deletionResult = await cart.findOneAndDelete({
      userId: data.userId,
      prodId: data.prodId,
      sellerId: data.sellerId,
    });
    if (!deletionResult) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    if (data.dept === "shirt") {
      const shirtUpdation = await shirt.findOneAndUpdate(
        {
          _id: data.prodId,
          sellerId: data.sellerId,
        },
        { $inc: { quantity: -data.quantity } },
        { new: true }
      );
      // console.log(shirtUpdation);
      if (!shirtUpdation) {
        return res.status(404).json({ error: "Product not found" });
      }
    }
    if (data.dept === "pant") {
      const pantUpdation = await pant.findOneAndUpdate(
        {
          _id: data.prodId,
          sellerId: data.sellerId,
        },
        { $inc: { quantity: -data.quantity } },
        { new: true }
      );
      // console.log(pantUpdation);
      if (!pantUpdation) {
        return res.status(404).json({ error: "Product not found" });
      }
    }
    if (data.dept === "tshirt") {
      const tShirtUpdation = await tshirt.findOneAndUpdate(
        {
          _id: data.prodId,
          sellerId: data.sellerId,
        },
        { $inc: { quantity: -data.quantity } },
        { new: true }
      );
      // console.log(tShirtUpdation);
      if (!tShirtUpdation) {
        return res.status(404).json({ error: "Product not found" });
      }
    }
    if (data.dept === "clothing") {
      const clothingUpdation = await clothing.findOneAndUpdate(
        {
          _id: data.prodId,
          sellerId: data.sellerId,
        },
        { $inc: { quantity: -data.quantity } },
        { new: true }
      );
      // console.log(clothingUpdation);
      if (!clothingUpdation) {
        return res.status(404).json({ error: "Product not found" });
      }
    }
    if (data.dept === "books") {
      const booksUpdation = await books.findOneAndUpdate(
        {
          _id: data.prodId,
          sellerId: data.sellerId,
        },
        { $inc: { quantity: -data.quantity } },
        { new: true }
      );
      // console.log(booksUpdation);
      if (!booksUpdation) {
        return res.status(404).json({ error: "Product not found" });
      }
    }
    if (data.dept === "footwear") {
      const footWearUpdation = await footWear.findOneAndUpdate(
        {
          _id: data.prodId,
          sellerId: data.sellerId,
        },
        { $inc: { quantity: -data.quantity } },
        { new: true }
      );
      // console.log(footWearUpdation);
      if (!footWearUpdation) {
        return res.status(404).json({ error: "Product not found" });
      }
    }
    if (data.dept === "eyewear") {
      const eyeWearUpdation = await eyeWear.findOneAndUpdate(
        {
          _id: data.prodId,
          sellerId: data.sellerId,
        },
        { $inc: { quantity: -data.quantity } },
        { new: true }
      );
      // console.log(eyeWearUpdation);
      if (!eyeWearUpdation) {
        return res.status(404).json({ error: "Product not found" });
      }
    }
    if (data.dept === "watch") {
      const watchUpdation = await watches.findOneAndUpdate(
        {
          _id: data.prodId,
          sellerId: data.sellerId,
        },
        { $inc: { quantity: -data.quantity } },
        { new: true }
      );
      // console.log(watchUpdation);
      if (!watchUpdation) {
        return res.status(404).json({ error: "Product not found" });
      }
    }

    return res.status(201).json({ message: "Successfull!", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Try again later!" });
  }
};

export {
  handlingCart,
  handleCartInfo,
  handleDeletionSingleProduct,
  handleQuantity,
  handleProductDeletion,
  handleCartConfirmation,
};
