import Review from "../model/review.js";

const handleRev = async (req, res) => {
  const data = req.body;
  try {
    const result = await Review.create({ ...data });

    return res.status(201).json({ message: "Success", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Try again later!" });
  }
};

const handleGetReviews = async (req, res) => {
  const data = req.body;
  //   console.log(data);

  try {
    const result = await Review.find({ prodId: data.id });

    if (!result) {
      return res
        .status(404)
        .json({ message: "No Reviews Found for this product!" });
    }

    return res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Try again later!" });
  }
};

export { handleRev, handleGetReviews };
