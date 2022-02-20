import express from "express";
import { addFavoriteSong } from "../services/user/addFavoriteSong";
import { addTerms } from "../services/user/addTerms";
import { getFavoriteSongs } from "../services/user/getFavoriteSongs";
import { getRecentTerms } from "../services/user/getRecentTerms";
import { removeFavoriteSong } from "../services/user/removeFavoriteSong";

const router = express.Router();

router.patch("/addFavoriteSong", addFavoriteSong);
router.patch("/removeFavoriteSong", removeFavoriteSong);
router.get("/getFavoriteSongs", getFavoriteSongs);
router.patch("/addTerms", addTerms);
router.get("/getRecentTerms", getRecentTerms);

export default router;
