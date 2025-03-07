import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model/db.js";
import axios from "axios";
import telesignsdk from "telesignsdk";
import { seller } from "../model/seller.js";

const smsController = async (req, res) => {
  const { phone_num } = req.body;

  const customerId = process.env.SMS_CUSTOMER_ID;
  const apiKey = process.env.SMS_API_KEY;

  const message = "Your Otp is : 1234";
  const messageType = "OTP";

  const client = new telesignsdk(customerId, apiKey);

  function smsCallback(error, responseBody) {
    if (error === null) {
      res
        .status(200)
        .json({ message: "Success", data: JSON.stringify(responseBody) });
    } else {
      console.error("Unable to send SMS. Error:\n\n" + error);
      res.status(500).json({ error: "Try again later!" });
    }
  }

  client.sms.message(smsCallback, phone_num, message, messageType);
};

const optValidator = async (req, res) => {
  const { otp } = req.body;
  console.log(otp);
};

const registerController = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ error: "Username, Password, Email are required!" });
  }

  try {
    const userFound = await User.findOne({ username: username });
    if (userFound) {
      return res.status(409).json({ error: "Username already exists!" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      password: hashedPwd,
      email: email,
    });

    const result = await newUser.save();

    return res.status(200).json({ info: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Try after few minutes!" });
  }
};

const loginController = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required!" });
  }

  try {
    const userFound = await User.findOne({ username: username });

    if (!userFound) {
      return res.status(401).json({ error: "User does not exist!" });
    }

    const hashedPwd = userFound?.password;
    const match = await bcrypt.compare(password, hashedPwd);

    if (!match) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    const accessToken = jwt.sign(
      { username: username },
      process.env.SEC_ACC_TOK,
      {
        expiresIn: "30m",
      }
    );

    const refreshToken = jwt.sign(
      { username: username },
      process.env.SEC_REF_TOK,
      {
        expiresIn: 24 * 60 * 60 * 1000,
      }
    );

    res.cookie("jwt", refreshToken, {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const info = await User.findByIdAndUpdate(
      userFound._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );

    res.status(200).json({ accessToken: accessToken, info });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Down : try again later!" });
  }
};

const logoutController = async (req, res) => {
  const refreshToken = req?.cookies?.jwt;

  if (!refreshToken) {
    return res.sendStatus(403);
  }

  const findUser = await User.findOne({ refreshToken: refreshToken });

  if (!findUser) {
    res.clearCookie("jwt", {
      secure: false,
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    });
    return res.sensStatus(204);
  }

  try {
    const userFound = await User.findOne({ refreshToken: refreshToken });

    await User.findByIdAndUpdate(
      userFound._id,
      { refreshToken: "" },
      { new: true }
    );

    res.clearCookie("jwt", {
      secure: false,
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    });

    return res.status(204).json({ message: "Logout Successfull!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Try again later!" });
  }
};

const sellerRegisterController = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ error: "Username, Password, Email are required!" });
  }

  try {
    const userFound = await seller.findOne({ username: username });
    if (userFound) {
      return res.status(409).json({ error: "Username already exists!" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = await seller.create({
      username: username,
      password: hashedPwd,
      email: email,
    });

    const result = await newUser.save();

    return res.status(201).json({ info: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Try after few minutes!" });
  }
};

const sellerLoginController = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required!" });
  }

  try {
    const userFound = await seller.findOne({ username: username });

    if (!userFound) {
      return res.status(401).json({ error: "User does not exist!" });
    }

    const hashedPwd = userFound?.password;
    const match = await bcrypt.compare(password, hashedPwd);

    if (!match) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    const accessToken = jwt.sign(
      { username: username },
      process.env.SEC_ACC_TOK,
      {
        expiresIn: "30m",
      }
    );

    const refreshToken = jwt.sign(
      { username: username },
      process.env.SEC_REF_TOK,
      {
        expiresIn: 24 * 60 * 60 * 1000,
      }
    );

    res.cookie("jwt", refreshToken, {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const info = await seller.findByIdAndUpdate(
      userFound._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );

    res.status(200).json({ accessToken: accessToken, info });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Down : try again later!" });
  }
};

const sellerOnBoardController = async (req, res) => {
  const data = req.body;

  if (!data) {
    return res.status(400).json({ error: "Credentials are required!" });
  }

  try {
    const userFound = await seller.findOne({ username: data?.username });
    if (!userFound) {
      return res.status(400).json({ error: "Username Not Found!" });
    }
    const response = await seller.findOneAndUpdate(
      {
        username: data?.username,
      },
      {
        $set: {
          "sellerInfo.businessName": data?.businessName,
          "sellerInfo.businessType": data?.businessType,
          "sellerInfo.gstNum": data?.gstNum,
          "sellerInfo.panNum": data?.panNum,
          "sellerInfo.permanentAddress": data?.permanentAddress,
          "sellerInfo.businessAddress": data?.businessAddress,
          onboard: true,
        },
      },
      {
        new: true,
      }
    );
    if (!response) {
      return res.status(500).json({ error: "Try again Later!" });
    }
    // return res.status(200).json({ info: result });
    return res.status(200).json({ response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Try after few minutes!" });
  }
};

export {
  registerController,
  loginController,
  logoutController,
  smsController,
  sellerRegisterController,
  sellerLoginController,
  sellerOnBoardController,
};
