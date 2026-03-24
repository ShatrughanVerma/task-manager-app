import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'  // Import SignupPage
import CartPage from './pages/CartPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />  {/* Add this route */}
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  )
}

export default App