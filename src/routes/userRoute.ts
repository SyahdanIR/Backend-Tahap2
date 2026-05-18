import { Router } from "express";
import { getProfile, getUserbyId, createUser, hello, transferPoint } from "../controllers/userController";
import { createTransferSchema } from "../validation/userSchema";
import { validate } from "../middlewares/validate";

const router = Router();

router.get("/", getProfile);
router.get("/:name", getUserbyId);
router.post("/login", createUser);
router.get("/hello", hello);
router.post("/transfer", validate(createTransferSchema), transferPoint);

export default router;