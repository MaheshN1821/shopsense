import cart from "../model/cart.js";
import wishList from "../model/wishlist.js";

const handleCartCount = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ num: 0 });
  }
  try {
    const result = await cart.find({ userId: userId });
    res.status(200).json({ num: result.length });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ num: 0 });
  }
};

const handleWishlistCount = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ num: 0 });
  }
  try {
    const result = await wishList.find({ usrID: userId });
    res.status(200).json({ num: result.length });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ num: 0 });
  }
};

export { handleCartCount, handleWishlistCount };
