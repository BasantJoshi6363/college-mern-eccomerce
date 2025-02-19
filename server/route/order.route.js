import express from "express"
import { protect } from "../middleware/auth.middleware.js";
import { createOrder, getOrderById, updateOrderToDelivered, updateOrderToPaid } from "../controllers/order.controller.js";

const order_route = express.Router();
// Route to create a new order
order_route.route("/create").post(protect,createOrder)
// Route to get an order by ID
order_route.route("/:id").get(protect,getOrderById)
// // Route to update order to paid
// order_route.put('/:orderId/pay', protect, updateOrderToPaid);
// // Route to update order to delivered
// order_route.put('/:orderId/deliver',updateOrderToDelivered);


export default order_route;