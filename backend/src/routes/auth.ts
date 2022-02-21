import express from "express";
import { login } from "../services/auth/login";
import { register } from "../services/user/register";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/ping", (req, res) => res.send("All ok"));

export default router;
