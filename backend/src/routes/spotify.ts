import express from "express";
import { getToken } from "../services/spotify/getToken";

const router = express.Router();

router.get("/getToken", getToken);

export default router;
