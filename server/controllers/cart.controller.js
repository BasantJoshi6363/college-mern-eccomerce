import { Cart } from "../model/cart.model.js" 

// Add item to cart
export const addToCart = async (req, res) => {
  const { productId, qty } = req.body;

  try {
    const userCart = await Cart.findOne({ user: req.user._id });

    if (userCart) {
      // Check if product already exists in cart
      const productIndex = userCart.cartItems.findIndex(item => item.product.toString() === productId);

      if (productIndex > -1) {
        // Update quantity if product exists
        userCart.cartItems[productIndex].qty += qty;
      } else {
        // Add new product to cart
        userCart.cartItems.push({ product: productId, qty });
      }

      await userCart.save();
      res.status(200).json({ message: 'Cart updated successfully', cart: userCart });
    } else {
      // Create new cart for user
      const newCart = new Cart({
        user: req.user._id,
        cartItems: [{ product: productId, qty }]
      });

      const savedCart = await newCart.save();
      res.status(201).json({ message: 'Cart created successfully', cart: savedCart });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
};


