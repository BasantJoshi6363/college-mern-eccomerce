import { Order } from "../model/order.model.js";
// Create a new order
export const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;
  console.log(req.body)
  const { id } = req.user;
  console.log(id)

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  try {
    const order = new Order({
      user: id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice
    });

    const createdOrder = await Order.create(req.body);
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// Get an order by ID
export const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error getting order', error });
  }
};

// Update order to paid
export const updateOrderToPaid = async (req, res) => {
  const { orderId } = req.params;
  const { id, status, update_time, email_address } = req.body;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id,
      status,
      update_time,
      email_address
    };

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order to paid', error });
  }
};

export const getAllOrder = async (req, res) => {
  const username = req.user.fullname
  const orders = await Order.find({})
  res.status(200).json(orders)
}

// Update order to delivered
export const updateOrderToDelivered = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order to delivered', error });
  }
};
export const updateOrder = async (req, res) => {
  try {
    console.log("updating some info")
    const orderId = req.params.orderId.split(":")[1];
    await Order.findByIdAndUpdate(orderId, { data: req.body }, { new: true })
    res.status(200).json({ message: " updated order successfully." })
  } catch (error) {

  }
}

export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId.split(":")[1];
    await Order.findByIdAndDelete(orderId);
    res.json({ message: "order deleted successfully" })
  } catch (error) {
    console.log(error)
  }
}