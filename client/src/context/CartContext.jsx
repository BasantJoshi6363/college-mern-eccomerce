import React, { createContext, useContext, useState } from 'react';

// Create the cart context
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
    return useContext(CartContext);
};

// Cart provider component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([
        {
            id: '1',
            name: 'LCD Monitor',
            price: 550,
            quantity: 1,
            imageUrl: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
            id: '2',
            name: 'HI Gamepad',
            price: 550,
            quantity: 2,
            imageUrl: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
    ]);


    // Update item quantity
    const updateQuantity = (id, newQuantity) => {
        setCartItems(
            cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
        );
    };

    // Calculate subtotal
    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Add item to cart
    const addToCart = (item) => {
        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
            updateQuantity(item.id, existingItem.quantity + 1);
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };

    // Remove item from cart
    const removeFromCart = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    // Clear cart
    const clearCart = () => {
        setCartItems([]);
    };

    const subtotal = calculateSubtotal();
    const shipping = 'Free';
    const total = subtotal;

    const value = {
        cartItems,
        updateQuantity,
        addToCart,
        removeFromCart,
        clearCart,
        subtotal,
        shipping,
        total
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};