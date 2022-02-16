import express from "express";
import { User } from "../models/user";
import { addFavoriteSong } from "../services/user/addFavoriteSong";
import { getFavoriteSongs } from "../services/user/getFavoriteSongs";
import { removeFavoriteSong } from "../services/user/removeFavoriteSong";

const router = express.Router();

router.patch("/addFavoriteSong", addFavoriteSong);
router.patch("/removeFavoriteSong", removeFavoriteSong);
router.get("/getFavoriteSongs", getFavoriteSongs);
router.get("/", async (req, res) => {
  const users = await User.find({}).exec();
  res.send(JSON.stringify(users));
});

export default router;
