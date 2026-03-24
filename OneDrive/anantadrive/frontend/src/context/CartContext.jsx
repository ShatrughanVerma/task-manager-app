import React, { createContext, useState, useContext, useEffect } from 'react'

// Create Context
const CartContext = createContext()

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Error parsing cart from localStorage:', e)
        localStorage.removeItem('cart')
      }
    }
  }, [])

  // Update localStorage and calculate totals
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
    
    const count = cartItems.reduce((total, item) => total + item.quantity, 0)
    const total = cartItems.reduce((sum, item) => {
      const price = item.discountedPrice || item.price || 0
      return sum + (price * item.quantity)
    }, 0)
    
    setCartCount(count)
    setCartTotal(total)
  }, [cartItems])

  // Add to cart
  const addToCart = (item, quantity = 1, options = {}) => {
    setLoading(true)
    setError(null)

    try {
      setCartItems(prevItems => {
        const existingItemIndex = prevItems.findIndex(
          i => i.id === item.id && 
               JSON.stringify(i.options) === JSON.stringify(options)
        )

        if (existingItemIndex >= 0) {
          const updatedItems = [...prevItems]
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity
          }
          return updatedItems
        } else {
          return [...prevItems, {
            ...item,
            quantity,
            options,
            addedAt: new Date().toISOString()
          }]
        }
      })
      return { success: true, message: 'Item added to cart' }
    } catch (err) {
      setError('Failed to add item')
      return { success: false, message: 'Failed to add item' }
    } finally {
      setLoading(false)
    }
  }

  // Remove from cart
  const removeFromCart = (itemId, options = {}) => {
    setLoading(true)
    setError(null)

    try {
      setCartItems(prevItems => 
        prevItems.filter(item => 
          !(item.id === itemId && JSON.stringify(item.options) === JSON.stringify(options))
        )
      )
      return { success: true, message: 'Item removed' }
    } catch (err) {
      setError('Failed to remove item')
      return { success: false, message: 'Failed to remove item' }
    } finally {
      setLoading(false)
    }
  }

  // Update quantity
  const updateQuantity = (itemId, newQuantity, options = {}) => {
    if (newQuantity < 1) {
      removeFromCart(itemId, options)
      return
    }

    setLoading(true)
    setError(null)

    try {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId && JSON.stringify(item.options) === JSON.stringify(options)
            ? { ...item, quantity: newQuantity }
            : item
        )
      )
      return { success: true, message: 'Quantity updated' }
    } catch (err) {
      setError('Failed to update quantity')
      return { success: false, message: 'Failed to update quantity' }
    } finally {
      setLoading(false)
    }
  }

  // Clear cart
  const clearCart = () => {
    setLoading(true)
    setError(null)

    try {
      setCartItems([])
      return { success: true, message: 'Cart cleared' }
    } catch (err) {
      setError('Failed to clear cart')
      return { success: false, message: 'Failed to clear cart' }
    } finally {
      setLoading(false)
    }
  }

  // Toggle cart sidebar
  const toggleCart = () => {
    setIsCartOpen(prev => !prev)
  }

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    isCartOpen,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext