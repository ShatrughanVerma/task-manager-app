import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaGoogle,
  FaGithub,
  FaFacebookF,
  FaArrowLeft
} from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import './SignupPage.css'

const SignupPage = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  // UI state
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Password strength
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
    color: '#ef4444'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }

    // Check password strength
    if (name === 'password') {
      checkPasswordStrength(value)
    }
  }

  const checkPasswordStrength = (password) => {
    let score = 0
    let message = ''
    let color = '#ef4444'

    if (password.length >= 8) score++
    if (password.match(/[a-z]/)) score++
    if (password.match(/[A-Z]/)) score++
    if (password.match(/[0-9]/)) score++
    if (password.match(/[^a-zA-Z0-9]/)) score++

    switch(score) {
      case 0:
      case 1:
        message = 'Weak'
        color = '#ef4444'
        break
      case 2:
      case 3:
        message = 'Medium'
        color = '#f59e0b'
        break
      case 4:
        message = 'Good'
        color = '#10b981'
        break
      case 5:
        message = 'Strong'
        color = '#10b981'
        break
      default:
        message = 'Weak'
        color = '#ef4444'
    }

    setPasswordStrength({ score, message, color })
  }

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    // Terms agreement
    if (!agreeTerms) {
      newErrors.terms = 'You must agree to the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const success = register({
        name: formData.name,
        email: formData.email
      })
      
      if (success) {
        // Show success message
        alert('Account created successfully! Please check your email to verify your account.')
        navigate('/login')
      } else {
        setErrors({
          email: 'Email already exists'
        })
      }
      setLoading(false)
    }, 1500)
  }

  const handleSocialSignup = (provider) => {
    setLoading(true)
    // Simulate social signup
    setTimeout(() => {
      alert(`${provider} signup coming soon!`)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left Side - Branding */}
        <div className="signup-left">
          <div className="signup-left-content">
            <Link to="/" className="back-home">
              <FaArrowLeft /> Back to Home
            </Link>
            
            <div className="brand-content">
              <div className="brand-logo">
                <span className="logo-icon">⚡</span>
                <span className="logo-text">Hostinger Clone</span>
              </div>
              
              <h1 className="brand-title">Join Our Community</h1>
              <p className="brand-description">
                Create your account and start building your online presence with 
                the fastest hosting platform in the world.
              </p>

              <div className="benefits-list">
                <div className="benefit-item">
                  <span className="benefit-icon">🚀</span>
                  <div className="benefit-text">
                    <h4>Lightning Fast Performance</h4>
                    <p>SSD servers and optimized stack</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🔒</span>
                  <div className="benefit-text">
                    <h4>Bank-Level Security</h4>
                    <p>Free SSL & daily backups</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">💯</span>
                  <div className="benefit-text">
                    <h4>30-Day Money Back</h4>
                    <p>No questions asked guarantee</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🎧</span>
                  <div className="benefit-text">
                    <h4>24/7 Expert Support</h4>
                    <p>We're here to help anytime</p>
                  </div>
                </div>
              </div>

              <div className="testimonial">
                <p className="testimonial-text">
                  "The best hosting platform I've ever used. Fast, reliable, and 
                  their support team is amazing!"
                </p>
                <div className="testimonial-author">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Sarah Johnson"
                    className="author-image"
                  />
                  <div className="author-info">
                    <strong>Sarah Johnson</strong>
                    <span>Tech Entrepreneur</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="signup-right">
          <div className="signup-form-container">
            <div className="form-header">
              <h2>Create Account</h2>
              <p>Start your 30-day free trial today</p>
            </div>

            {/* Social Signup Buttons */}
            <div className="social-signup">
              <button 
                className="social-btn google"
                onClick={() => handleSocialSignup('Google')}
                disabled={loading}
              >
                <FaGoogle /> Google
              </button>
              <button 
                className="social-btn github"
                onClick={() => handleSocialSignup('GitHub')}
                disabled={loading}
              >
                <FaGithub /> GitHub
              </button>
              <button 
                className="social-btn facebook"
                onClick={() => handleSocialSignup('Facebook')}
                disabled={loading}
              >
                <FaFacebookF /> Facebook
              </button>
            </div>

            <div className="divider">
              <span>or sign up with email</span>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="signup-form">
              {/* Name Field */}
              <div className={`form-group ${errors.name ? 'error' : ''}`}>
                <label>
                  <FaUser className="input-icon" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              {/* Email Field */}
              <div className={`form-group ${errors.email ? 'error' : ''}`}>
                <label>
                  <FaEnvelope className="input-icon" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              {/* Password Field */}
              <div className={`form-group ${errors.password ? 'error' : ''}`}>
                <label>
                  <FaLock className="input-icon" />
                  Password
                </label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
                
                {/* Password Strength Meter */}
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-bars">
                      {[1, 2, 3, 4, 5].map((bar) => (
                        <div
                          key={bar}
                          className={`strength-bar ${bar <= passwordStrength.score ? 'active' : ''}`}
                          style={{
                            backgroundColor: bar <= passwordStrength.score ? passwordStrength.color : '#e5e7eb'
                          }}
                        ></div>
                      ))}
                    </div>
                    <span className="strength-text" style={{ color: passwordStrength.color }}>
                      {passwordStrength.message}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className={`form-group ${errors.confirmPassword ? 'error' : ''}`}>
                <label>
                  <FaLock className="input-icon" />
                  Confirm Password
                </label>
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="error-message">{errors.confirmPassword}</span>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className={`terms-group ${errors.terms ? 'error' : ''}`}>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    disabled={loading}
                  />
                  <span>
                    I agree to the{' '}
                    <Link to="/terms" className="terms-link">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                  </span>
                </label>
                {errors.terms && (
                  <span className="error-message">{errors.terms}</span>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="signup-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  'Create Free Account'
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="login-link">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <span>🔒</span>
                <span>256-bit SSL</span>
              </div>
              <div className="trust-badge">
                <span>💳</span>
                <span>Secure Payment</span>
              </div>
              <div className="trust-badge">
                <span>⭐</span>
                <span>4.8/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage