import React, { createContext, useState, useContext, useEffect } from 'react'

// Create Context
const AuthContext = createContext()

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check for saved user in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error('Error parsing user from localStorage:', e)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  // Login function
  const login = async (email, password) => {
    setLoading(true)
    setError(null)

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock validation
        if (email === 'test@test.com' && password === 'password') {
          const userData = {
            id: '1',
            name: 'Test User',
            email: 'test@test.com',
            role: 'user',
            isVerified: true,
            createdAt: new Date().toISOString()
          }
          
          localStorage.setItem('user', JSON.stringify(userData))
          setUser(userData)
          setLoading(false)
          resolve({ success: true, message: 'Login successful!' })
        } else {
          setError('Invalid email or password')
          setLoading(false)
          resolve({ success: false, message: 'Invalid email or password' })
        }
      }, 1000)
    })
  }

  // Register function
  const register = async (userData) => {
    setLoading(true)
    setError(null)

    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if email already exists (mock)
        if (userData.email === 'test@test.com') {
          setError('Email already exists')
          setLoading(false)
          resolve({ success: false, message: 'Email already exists' })
        } else {
          const newUser = {
            id: Date.now().toString(),
            name: userData.name,
            email: userData.email,
            role: 'user',
            isVerified: false,
            createdAt: new Date().toISOString()
          }
          
          localStorage.setItem('user', JSON.stringify(newUser))
          setUser(newUser)
          setLoading(false)
          resolve({ 
            success: true, 
            message: 'Registration successful! Please verify your email.' 
          })
        }
      }, 1000)
    })
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setError(null)
  }

  // Update profile
  const updateProfile = async (profileData) => {
    setLoading(true)
    setError(null)

    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUser = {
          ...user,
          ...profileData
        }
        
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setUser(updatedUser)
        setLoading(false)
        resolve({ success: true, message: 'Profile updated successfully!' })
      }, 1000)
    })
  }

  // Change password
  const changePassword = async (passwordData) => {
    setLoading(true)
    setError(null)

    return new Promise((resolve) => {
      setTimeout(() => {
        if (passwordData.currentPassword === 'password') {
          resolve({ success: true, message: 'Password changed successfully!' })
        } else {
          setError('Current password is incorrect')
          resolve({ success: false, message: 'Current password is incorrect' })
        }
        setLoading(false)
      }, 1000)
    })
  }

  // Forgot password
  const forgotPassword = async (email) => {
    setLoading(true)
    setError(null)

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          message: 'Password reset email sent. Please check your inbox.' 
        })
        setLoading(false)
      }, 1000)
    })
  }

  // Reset password
  const resetPassword = async (token, password) => {
    setLoading(true)
    setError(null)

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          message: 'Password reset successful! You can now login.' 
        })
        setLoading(false)
      }, 1000)
    })
  }

  // Verify email
  const verifyEmail = async (token) => {
    setLoading(true)
    setError(null)

    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUser = {
          ...user,
          isVerified: true
        }
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
        
        resolve({ success: true, message: 'Email verified successfully!' })
        setLoading(false)
      }, 1000)
    })
  }

  // Clear error
  const clearError = () => {
    setError(null)
  }

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role
  }

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isVerified: user?.isVerified || false,
    hasRole,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    verifyEmail,
    clearError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext