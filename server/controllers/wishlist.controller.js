import wishList from "../model/wishlist.js";

const handleWishList = async (req, res) => {
  try {
    const data = req.body;

    const productId = data.prodID;
    const usersId = data.usrID;

    const result = await wishList.find({ prodID: productId, usrID: usersId });

    if (result.length === 1) {
      return res.status(200).json({ message: "Product exists in Wishlist!" });
    }

    const wishListProd = await wishList.create({ ...data });

    await wishListProd.save();

    res.status(200).json({ message: "Wishlist Successful!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Please try again later!" });
  }
};

const handleWishListFromDetails = async (req, res) => {
  try {
    const data = req.body;

    const productId = data.id;
    const usersId = data.userId;

    const result = await wishList.find({ prodID: productId, usrID: usersId });

    if (result.length === 1) {
      return res.status(200).json({ message: "Product exists in Wishlist!" });
    }

    const wishListProd = await wishList.create({
      wishlistBrandName: data.brandName,
      wishlistImage: data.img,
      wishlistOffPrice: data.offPrice,
      wishlistPrice: data.price,
      wishlistProdDesc: data.prodDesc,
      wishlistRating: data.rating,
      wishListFor: data.for,
      wishListOffer: data.offer,
      wishListProdType: data.prodType,
      usrID: data.userId,
      prodID: data.id,
      quantity: data.quantity,
      dept: data.dept,
      size: data.size,
      prodInfo: data.prodInfo,
      sellerId: data.sellerId,
    });
    await wishListProd.save();

    res.status(200).json({ message: "Wishlist Successful!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Please try again later!" });
  }
};

const wishListInfo = async (req, res) => {
  try {
    const usersId = req.body.usersId;
    const wishListData = await wishList.find({
      usrID: usersId,
    });

    res.status(200).json({ wishListData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Please try again later!" });
  }
};

const removeWishListProd = async (req, res) => {
  try {
    const usersId = req.body.usersId;
    const prodId = req.body.productId;

    await wishList.deleteOne({
      prodID: prodId,
      usrID: usersId,
    });

    res.status(200).json({ message: "Successful!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later" });
  }
};

export {
  handleWishList,
  wishListInfo,
  removeWishListProd,
  handleWishListFromDetails,
};
