import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Header.css'

const Header = () => {
  const { cartCount } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  const services = [
    { name: 'Web Hosting', path: '/web-hosting', icon: '🌐' },
    { name: 'Cloud Hosting', path: '/cloud-hosting', icon: '☁️' },
    { name: 'VPS Hosting', path: '/vps-hosting', icon: '🚀' },
    { name: 'WordPress Hosting', path: '/wordpress', icon: '📝' },
    { name: 'Reseller Hosting', path: '/reseller', icon: '🔄' },
    { name: 'Dedicated Servers', path: '/dedicated', icon: '🖥️' }
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (!isMobileMenuOpen) {
      setIsServicesOpen(false)
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsServicesOpen(false)
  }

  const toggleServices = (e) => {
    e.preventDefault()
    setIsServicesOpen(!isServicesOpen)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo - Left Side */}
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <span className="logo-icon">⚡</span>
            <span className="logo-text">Anantadrive</span>
          </Link>
          
          {/* Centered Navigation - All items in center */}
          <div className="center-menu">
            <Link to="/" className="nav-link">Home</Link>
            
            {/* Services Dropdown */}
            <div className="nav-item has-dropdown">
              <button className="nav-link services-trigger" onClick={toggleServices}>
                Services <span className="dropdown-arrow">▼</span>
              </button>
              <div className={`dropdown-menu ${isServicesOpen ? 'show' : ''}`}>
                {services.map((service, index) => (
                  <Link 
                    key={index} 
                    to={service.path} 
                    className="dropdown-item"
                    onClick={closeMobileMenu}
                  >
                    <span className="service-icon">{service.icon}</span>
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/cart" className="nav-link cart-link">
              Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            
            <Link to="/login" className="nav-link">Login</Link>
            
            <Link to="/signup" className="nav-link signup-link">Sign Up</Link>
          </div>

          {/* Empty div for flex spacing */}
          <div className="right-spacer"></div>

          {/* Mobile Menu Toggle */}
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span>{isMobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>Home</Link>
        
        {/* Mobile Services Accordion */}
        <div className="mobile-services">
          <button className="mobile-nav-link services-toggle" onClick={toggleServices}>
            Services <span className={`arrow ${isServicesOpen ? 'open' : ''}`}>▼</span>
          </button>
          <div className={`mobile-submenu ${isServicesOpen ? 'open' : ''}`}>
            {services.map((service, index) => (
              <Link 
                key={index} 
                to={service.path} 
                className="mobile-submenu-link"
                onClick={closeMobileMenu}
              >
                <span className="service-icon">{service.icon}</span>
                {service.name}
              </Link>
            ))}
          </div>
        </div>

        <Link to="/cart" className="mobile-nav-link" onClick={closeMobileMenu}>
          Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
        <Link to="/login" className="mobile-nav-link" onClick={closeMobileMenu}>Login</Link>
        <Link to="/signup" className="mobile-nav-link signup-mobile" onClick={closeMobileMenu}>
          Sign Up
        </Link>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay active" onClick={closeMobileMenu}></div>
      )}
    </header>
  )
}

export default Header 