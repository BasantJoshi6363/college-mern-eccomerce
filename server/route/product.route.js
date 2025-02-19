import express from "express"
import { createProduct, deleteProduct, getProductByCategory, getProductById, getProducts, updateProduct } from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { protect,admin } from "../middleware/auth.middleware.js";

const product_router = express.Router();



product_router.route("/create").post(protect, admin, upload.single("image"), createProduct)
product_router.route("/").get(getProducts)
product_router.route("/:cat").get(getProductByCategory)
product_router.route("/:id").get(getProductById)
product_router.route("/:id").put(protect,admin,updateProduct)
product_router.route("/:id").delete(protect, admin, deleteProduct)

export default product_router;
