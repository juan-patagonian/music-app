import express from "express";
import { User } from "../models/user";
import { register } from "../services/user/register";

const router = express.Router();

router.post("/register", register);

router.get("/", async (req, res) => {
  const users = await User.find({}).exec();
  res.send(JSON.stringify(users));
});

export default router;
