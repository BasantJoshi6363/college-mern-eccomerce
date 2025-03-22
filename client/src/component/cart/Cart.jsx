import React from "react";
import CartItem from "./CartItem";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, subtotal, shipping, total, clearCart } = useCart();

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <>
          {/* Cart Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <CartItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    imageUrl={item.image}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Buttons (Clear Cart / Return Home) */}
          <div className="flex justify-between mt-8">
            <div className="flex space-x-2">
              <Link to="/" className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                Return to Home
              </Link>
              <button
                onClick={clearCart}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="mt-8 flex justify-end">
            <div className="w-80 border border-gray-200 rounded p-4">
              <h2 className="text-lg font-bold mb-4">Cart Total</h2>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>Subtotal:</span>
                <span className="font-medium">${subtotal}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>Shipping:</span>
                <span>{shipping}</span>
              </div>

              <div className="flex justify-between py-2 font-bold">
                <span>Total:</span>
                <span>${total}</span>
              </div>

              <Link to="/checkout" className="block w-full mt-4">
                <button className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        // Empty Cart Message
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 mb-6">Your cart is empty</p>
          <Link to="/" className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
