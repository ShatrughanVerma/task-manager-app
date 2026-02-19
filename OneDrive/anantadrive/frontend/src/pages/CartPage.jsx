import React from 'react'
import Header from '../components/Header'
import { useCart } from '../context/CartContext'
import './CartPage.css'

const CartPage = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <Header />
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <button onClick={() => window.location.href = '/'}>
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <Header />
      <div className="cart-container">
        <h1>Shopping Cart ({cartItems.length} items)</h1>
        
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="item-price">${item.price}</p>
              </div>
              
              <div className="item-quantity">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              
              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              
              <button 
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h3>Total: ${cartTotal.toFixed(2)}</h3>
          <button className="checkout-btn">Proceed to Checkout</button>
          <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
        </div>
      </div>
    </div>
  )
}

export default CartPage