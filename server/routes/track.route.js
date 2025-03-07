import express from "express";
import {
  handleSellerTrack,
  handleSellerTrackUpdate,
  handleUserTrack,
} from "../controllers/track.controller.js";

const router = express.Router();

router.post("/", handleSellerTrack);

router.post("/update", handleSellerTrackUpdate);

router.post("/user/products", handleUserTrack);

export default router;
