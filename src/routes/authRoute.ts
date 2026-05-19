import { Router } from "express";
import { register, login } from "../controllers/authController";
import { upload } from "../lib/multer";

const router = Router();

router.post("/register", upload.single("image"), register);
router.post("/login", login);

export default router;