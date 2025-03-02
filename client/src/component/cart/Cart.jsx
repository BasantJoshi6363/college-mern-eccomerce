import React from 'react';
import CartItem from './CartItem';
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const { 
    cartItems, 
    couponCode, 
    setCouponCode, 
    subtotal, 
    shipping, 
    total 
  } = useCart();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      <div className="grid grid-cols-4 gap-4 pb-2 border-b border-gray-200 text-sm text-gray-500">
        <div>Product</div>
        <div className="text-right">Price</div>
        <div className="text-center">Quantity</div>
        <div className="text-right">Subtotal</div>
      </div>
      
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          imageUrl={item.imageUrl}
        />
      ))}
      
      <div className="flex justify-between mt-8">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Coupon Code"
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            Apply Coupon
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            Return To Shop
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            Update Cart
          </button>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <div className="w-80 border border-gray-200 rounded p-4">
          <h2 className="text-lg font-bold mb-4">Cart Total</h2>
          
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span>Subtotal:</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span>Shipping:</span>
            <span>{shipping}</span>
          </div>
          
          <div className="flex justify-between py-2 font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <button className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;