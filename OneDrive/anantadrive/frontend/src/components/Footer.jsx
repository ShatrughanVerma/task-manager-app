import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn, FaGithub } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    products: [
      { name: 'Web Hosting', path: '/web-hosting' },
      { name: 'Domain Names', path: '/domains' },
      { name: 'WordPress Hosting', path: '/wordpress-hosting' },
      { name: 'VPS Hosting', path: '/vps-hosting' },
      { name: 'Dedicated Servers', path: '/dedicated-servers' },
      { name: 'SSL Certificates', path: '/ssl-certificates' }
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Blog', path: '/blog' },
      { name: 'Press', path: '/press' },
      { name: 'Affiliate Program', path: '/affiliate' },
      { name: 'Contact Us', path: '/contact' }
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Knowledge Base', path: '/knowledge-base' },
      { name: 'Tutorials', path: '/tutorials' },
      { name: 'Community', path: '/community' },
      { name: 'Report Abuse', path: '/report-abuse' },
      { name: 'System Status', path: '/status' }
    ],
    legal: [
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'DMCA', path: '/dmca' },
      { name: 'Data Processing', path: '/data-processing' },
      { name: 'Acceptable Use', path: '/acceptable-use' }
    ]
  }

  const socialLinks = [
    { icon: <FaFacebookF />, url: 'https://facebook.com', name: 'Facebook' },
    { icon: <FaTwitter />, url: 'https://twitter.com', name: 'Twitter' },
    { icon: <FaInstagram />, url: 'https://instagram.com', name: 'Instagram' },
    { icon: <FaYoutube />, url: 'https://youtube.com', name: 'YouTube' },
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com', name: 'LinkedIn' },
    { icon: <FaGithub />, url: 'https://github.com', name: 'GitHub' }
  ]

  const paymentMethods = [
    { name: 'Visa', icon: '💳' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'American Express', icon: '💳' },
    { name: 'PayPal', icon: '🅿️' },
    { name: 'Google Pay', icon: '📱' },
    { name: 'Apple Pay', icon: '📱' }
  ]

  return (
    <footer className="footer">
      <div className="footer-newsletter">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h3>Subscribe to Our Newsletter</h3>
              <p>Get the latest offers, news, and updates directly in your inbox.</p>
            </div>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* About Section */}
            <div className="footer-section about-section">
              <div className="footer-logo">
                <span className="logo-icon">⚡</span>
                <span className="logo-text">Anantadrive</span>
              </div>
              <p className="footer-description">
                Anantadrive provides fast, secure, and reliable web hosting services 
                for individuals and businesses of all sizes. With 24/7 support and 
                99.9% uptime guarantee, we're here to help you succeed online.
              </p>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Products Links */}
            <div className="footer-section">
              <h3 className="footer-title">Products</h3>
              <ul className="footer-links">
                {footerLinks.products.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="footer-section">
              <h3 className="footer-title">Company</h3>
              <ul className="footer-links">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="footer-section">
              <h3 className="footer-title">Support</h3>
              <ul className="footer-links">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="footer-section">
              <h3 className="footer-title">Legal</h3>
              <ul className="footer-links">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="payment-methods">
            <h4 className="payment-title">We Accept</h4>
            <div className="payment-icons">
              {paymentMethods.map((method, index) => (
                <div key={index} className="payment-icon" title={method.name}>
                  <span>{method.icon}</span>
                  <span className="payment-name">{method.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="copyright">
              &copy; {currentYear} Anantadrive. All rights reserved.
            </div>
            <div className="footer-bottom-links">
              <Link to="/sitemap">Sitemap</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/cookies">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer