import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaEnvelope, FaLock } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import './LoginPage.css'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = login(email, password)
    if (success) {
      navigate('/')
    } else {
      setError('Invalid email or password')
    }
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="login-page">
      {/* Weather Info - Top Right */}
      <div className="weather-info">
        <span className="weather-temp">17°C</span>
        <span className="weather-desc">Mostly sunny</span>
      </div>

      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Login to your account</p>
          
          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope className="input-icon" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <FaLock className="input-icon" />
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Button Group - Back and Login together */}
            <div className="button-group">
              <button type="button" onClick={goBack} className="back-btn">
                <FaArrowLeft /> Back
              </button>
              <button type="submit" className="login-btn">
                Login
              </button>
            </div>
          </form>

          <p className="login-footer">
            Don't have an account? <Link to="/signup" className="login-link">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage