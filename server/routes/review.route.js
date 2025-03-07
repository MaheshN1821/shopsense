import express from "express";
import {
  handleGetReviews,
  handleRev,
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", handleRev);

router.post("/get-data", handleGetReviews);

export default router;
