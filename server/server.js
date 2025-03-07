import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import handleAuth from "./routes/auth.route.js";
import handleProducts from "./routes/product.route.js";
import handleCart from "./routes/cart.route.js";
import handleCount from "./routes/count.route.js";
import handleSeller from "./routes/seller.route.js";
import handlePayment from "./routes/payment.route.js";
import handleTrack from "./routes/track.route.js";
import handleReview from "./routes/review.route.js";
import handleRefreshToken from "./routes/refreshToken.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://shopsense-beta.vercel.app",
      "https://www.shopsense-beta.vercel.app",
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400,
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", handleAuth);
app.use("/refresh", handleRefreshToken);
app.use("/products", handleProducts);
app.use("/cart", handleCart);
app.use("/count", handleCount);
app.use("/seller", handleSeller);
app.use("/payment", handlePayment);
app.use("/track", handleTrack);
app.use("/review", handleReview);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

const MongoUrl = process.env.MONGO_URL;
const PORT = process.env.PORT || 3500;

mongoose
  .connect(MongoUrl)
  .then(() => {
    console.log("DataBase is connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running in Port ${PORT}`);
});
