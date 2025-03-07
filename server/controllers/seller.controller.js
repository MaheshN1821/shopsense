import { seller } from "../model/seller.js";

const handleGetSeller = async (req, res) => {
  const { sellerId } = req.params;

  try {
    const result = await seller.findById(sellerId);

    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later" });
  }
};

const handleDataUpdation = async (req, res) => {
  const {
    businessAddress,
    businessName,
    businessType,
    email,
    gstNum,
    panNum,
    permanentAddress,
    username,
    sellerId,
  } = req.body;

  if (
    !businessAddress ||
    !businessName ||
    !businessType ||
    !email ||
    !gstNum ||
    !panNum ||
    !permanentAddress ||
    !username ||
    !sellerId
  ) {
    return res.status(400).json({ error: "Enter all the details" });
  }
  try {
    const result = await seller.findByIdAndUpdate(
      sellerId,
      {
        $set: {
          username: username,
          email: email,
          "sellerInfo.businessName": businessName,
          "sellerInfo.businessType": businessType,
          "sellerInfo.businessAddress": businessAddress,
          "sellerInfo.gstNum": gstNum,
          "sellerInfo.panNum": panNum,
          "sellerInfo.permanentAddress": permanentAddress,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "Updated", result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later" });
  }
};

export { handleGetSeller, handleDataUpdation };
