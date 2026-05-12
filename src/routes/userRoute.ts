import { Router } from "express";
import { getProfile, getUserbyId, createUser, hello } from "../controllers/userController";

const router = Router();

router.get("/profile", getProfile);
router.get("/profile/:name", getUserbyId);
router.post("/login", createUser);
router.get("/hello", hello);

export default router;