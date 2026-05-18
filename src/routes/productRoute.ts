import { Router } from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController";
import { createProductSchema } from "../validation/productSchema";
import { validate } from "../middlewares/validate";

const router = Router();

router.post("/", validate(createProductSchema), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;