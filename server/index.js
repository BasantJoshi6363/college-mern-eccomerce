import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./config/db.js";
import auth_router from "./route/auth.route.js";
import product_router from "./route/product.route.js";
import order_route from "./route/order.route.js";
import cart_router from "./route/cart.route.js"


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth",auth_router);
app.use("/api/products",product_router);
app.use('/api/orders', order_route);
app.use("/api/cart",cart_router)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
