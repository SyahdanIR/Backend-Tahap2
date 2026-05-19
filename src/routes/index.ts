import { Router } from "express";
import userRoute from "./userRoute";
import productRoute from "./productRoute";
import authRoute from "./authRoute";

const router = Router();

router.use("/profile", userRoute);
router.use("/products", productRoute);
router.use("/auth", authRoute);

export default router;