"use client"

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react"
import { toast } from "react-toastify"

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cartItems")) || []
    } catch {
      return []
    }
  })

  // Save to localStorage when cartItems change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  // Add item to cart - memoized with useCallback
  const addToCart = useCallback((item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((cartItem) => cartItem._id === item._id)

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += 1
        return updatedItems
      }

      toast.success("Item added to cart.")
      return [...prevItems, { ...item, quantity: 1 }]
    })
  }, [])

  // Update item quantity - memoized with useCallback
  const updateQuantity = useCallback((_id, newQuantity) => {
    setCartItems((prevItems) => prevItems.map((item) => (item._id === _id ? { ...item, quantity: newQuantity } : item)))
  }, [])

  // Remove item from cart - memoized with useCallback
  const removeFromCart = useCallback((_id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== _id))
  }, [])

  // Clear cart - memoized with useCallback
  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  // Memoized values to avoid unnecessary re-renders
  const { subtotal, shipping, total } = useMemo(() => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    return { subtotal, shipping: "Free", total: subtotal }
  }, [cartItems])

  // Memoize the entire context value
  const contextValue = useMemo(
    () => ({
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      subtotal,
      shipping,
      total,
    }),
    [cartItems, addToCart, updateQuantity, removeFromCart, clearCart, subtotal, shipping, total],
  )

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

