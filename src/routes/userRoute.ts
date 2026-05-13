import { Router } from "express";
import { getProfile, getUserbyId, createUser, hello } from "../controllers/userController";

const router = Router();

router.get("/", getProfile);
router.get("/:name", getUserbyId);
router.post("/login", createUser);
router.get("/hello", hello);

export default router;