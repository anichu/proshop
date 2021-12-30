import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import {
	createProduct,
	createProductReview,
	deleteProductById,
	getProductById,
	getProducts,
	getTopProducts,
	updateProduct,
} from "../controllers/productController.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get("/top", getTopProducts);

router
	.route("/:id")
	.get(getProductById)
	.delete(protect, admin, deleteProductById)
	.put(protect, admin, updateProduct);

router.post("/:id/reviews", protect, createProductReview);
export default router;
