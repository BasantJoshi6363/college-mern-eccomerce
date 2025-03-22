import express from "express"
import { protect } from "../middleware/auth.middleware.js";
import { createOrder, getOrderById,getAllOrder, updateOrderToDelivered, updateOrderToPaid, deleteOrder, updateOrder } from "../controllers/order.controller.js";

const order_route = express.Router();
// Route to create a new order
order_route.route("/create").post(protect,createOrder)
order_route.route("/").get(protect,getAllOrder)
// Route to get an order by ID
order_route.route("/:id").get(protect,getOrderById)
// // Route to update order to paid
order_route.put('/:orderId/pay', protect, updateOrderToPaid);
order_route.put('/:orderId', protect, updateOrder);
// // Route to update order to delivered
order_route.put('/:orderId/deliver',updateOrderToDelivered);
order_route.delete('/:orderId',deleteOrder);


export default order_route;