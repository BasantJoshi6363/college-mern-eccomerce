import express from "express";
import cors from "cors"
import { connectDB } from "./config/db.js";
import auth_router from "./route/auth.route.js";
import product_router from "./route/product.route.js";
import order_route from "./route/order.route.js";
import cart_router from "./route/cart.route.js"
import dotenv from "dotenv"


connectDB();

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api/auth",auth_router);
app.use("/api/products",product_router);
app.use('/api/orders', order_route);
app.use("/api/cart",cart_router)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
