import jwt from "jsonwebtoken";
import User from "../model/db.js";

const refreshTokenController = async (req, res) => {
  const refreshToken = req?.cookies?.jwt;

  if (!refreshToken) {
    return res.status(401).json({ error: "Login Again!" });
  }

  const findUser = await User.findOne({ refreshToken: refreshToken });

  if (!findUser) {
    return res.status(401).json({ error: "Login again!" });
  }

  try {
    jwt.verify(refreshToken, process.env.SEC_REF_TOK, (err, user) => {
      if (err || findUser.username !== user?.username) {
        return res.status(401).json({ error: "Login Again!" });
      }
      const newAccessToken = jwt.sign(
        { username: user.username },
        process.env.SEC_ACC_TOK,
        { expiresIn: "30s" }
      );

      res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Login again!" });
  }
};

export default refreshTokenController;
