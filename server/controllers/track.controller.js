import Order from "../model/order.js";

const handleSellerTrack = async (req, res) => {
  const data = req.body;
  try {
    const response = await Order.find({ sellerId: data.sellerId });
    return res.status(200).json({ response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Try again later!" });
  }
};

const handleSellerTrackUpdate = async (req, res) => {
  const data = req.body;

  try {
    const result = await Order.findByIdAndUpdate(
      data?.trackingId,
      {
        $set: { progress: data?.msg },
      },
      { new: true }
    );

    if (!result) {
      return res.status(500).json({ error: "Try again later!" });
    }

    return res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Try again later!" });
  }
};

const handleUserTrack = async (req, res) => {
  const data = req.body;
  try {
    const response = await Order.find({ userId: data.userId });
    return res.status(200).json({ response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Try again later!" });
  }
};

export { handleSellerTrack, handleSellerTrackUpdate, handleUserTrack };
