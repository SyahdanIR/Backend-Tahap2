import { Router } from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController";
import { createProductSchema } from "../validation/productSchema";
import { validate } from "../middlewares/validate";
import { authentication } from "../middlewares/authMiddleware";
import { authorizeRole } from "../middlewares/authorizeRole";
import { upload } from "../lib/multer";

const router = Router();

router.post("/", authentication, upload.single("image"), validate(createProductSchema), createProduct);
router.get("/", authentication, authorizeRole(['ADMIN', 'USER']), getAllProducts);
router.get("/:id", authentication, authorizeRole(['ADMIN', 'USER']), getProductById);
router.put("/:id", authentication, authorizeRole(['ADMIN', 'USER']), validate(createProductSchema), updateProduct);
router.delete("/:id", authentication, authorizeRole(['ADMIN']), deleteProduct);

export default router;