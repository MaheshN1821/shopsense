import express from "express";
import {
  handleStatus,
  handleUserPayment,
} from "../controllers/payment.controller.js";
import cors from "cors";

const specificCors = cors({
  origin: "https://shopsense-beta.vercel.app",
  methods: ["POST", "GET"],
  allowedHeaders: ["Content-Type", "X-VERIFY", "accept"],
});

// const specificCors = cors({
//   origin: [
//     "https://shopsense-beta.vercel.app",
//     "https://www.shopsense-beta.vercel.app",
//   ],
//   methods: ["POST", "GET"],
//   allowedHeaders: ["Content-Type", "X-VERIFY", "accept"],
// });

const router = express.Router();

router.post("/order", specificCors, handleUserPayment);

router.post("/status", specificCors, handleStatus);

export default router;
