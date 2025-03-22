import React, { useContext, useState } from 'react';
import { useCart } from '../context/CartContext';
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';

const Checkout = () => {
  const { id } = useContext(AuthContext);
  const { cartItems, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    townCity: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
    emailAddress: '',
    saveInfo: false,
    paymentMethod: 'cash'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // Calculate totals from cart context items
  const subtotal = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Transform cart items to match the order model structure
      const orderItems = cartItems.map(item => ({
        product: item.id, // Assuming item.id is the product ID
        name: item.name,
        image: item.image,
        qty: item.quantity || 1,
        price: item.price
      }));
      
      const response = await axios.post('http://localhost:5000/api/orders/create', {
        user: id, // Use the id from AuthContext
        orderItems,
        shippingAddress: {
          address: formData.streetAddress + (formData.apartment ? `, ${formData.apartment}` : ''),
          city: formData.townCity,
          postalCode: formData.postalCode,
          country: formData.country
        },
        paymentMethod: formData.paymentMethod,
        totalPrice: total,
        isPaid: false,
        isDelivered: false
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("authToken")}`
        }
      });
      
      setSuccess(true);
      console.log('Order created successfully:', response.data);
      clearCart();
    } catch (err) {
      console.error('Order creation failed:', err);
      setError(
        err.response?.data?.message || 
        err.message || 
        'Failed to create order. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="px-12 container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Billing Details</h1>
      
      {success ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Order placed successfully!
        </div>
      ) : null}
      
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Street Address<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Apartment, floor, etc. (optional)
            </label>
            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Town/City<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="townCity"
              value={formData.townCity}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Postal Code<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Country<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="saveInfo"
                checked={formData.saveInfo}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-sm">Save this information for faster check-out next time</span>
            </label>
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map(item => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="h-12 w-12 object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      {item.quantity && <p className="text-sm text-gray-500">Qty: {item.quantity}</p>}
                    </div>
                    <div className="font-medium">${item.price}</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">Your cart is empty</div>
              )}
            </div>
            
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between py-2">
                <span>Subtotal:</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between py-2 font-bold">
                <span>Total:</span>
                <span>${total}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === 'bank'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span>Bank</span>
                  <div className="ml-auto flex space-x-2">
                    <span className="w-8 h-5 bg-gray-200 rounded"></span>
                    <span className="w-8 h-5 bg-gray-200 rounded"></span>
                    <span className="w-8 h-5 bg-gray-200 rounded"></span>
                  </div>
                </label>
              </div>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span>Cash on delivery</span>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isLoading || cartItems.length === 0}
                className={`w-full py-3 bg-red-500 text-white rounded ${(isLoading || cartItems.length === 0) ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;