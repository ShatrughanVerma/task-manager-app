import React from 'react'
import { FaCheck, FaStar, FaRocket, FaShieldAlt, FaHeadset, FaCloud, FaDatabase, FaGlobe } from 'react-icons/fa'
import './Plans.css'

const Plans = ({ plans, loading }) => {
  // Plan icons mapping
  const getPlanIcon = (planName) => {
    const icons = {
      'Basic': <FaCloud />,
      'Premium': <FaRocket />,
      'Business': <FaDatabase />,
      'Enterprise': <FaGlobe />
    }
    return icons[planName] || <FaCloud />
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading amazing plans...</p>
      </div>
    )
  }

  return (
    <section className="plans">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">PRICING PLANS</span>
          <h2 className="section-title">Our Hosting Plans</h2>
          <p className="section-subtitle">Choose the perfect plan for your needs</p>
        </div>
        
        <div className="plans-grid">
          {plans.map((plan, index) => (
            <div 
              key={plan._id} 
              className={`plan-card ${plan.popular ? 'popular' : ''} ${index === 1 ? 'featured' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="popular-badge">
                  <FaStar className="badge-icon" />
                  <span>Most Popular</span>
                </div>
              )}
              
              <div className="plan-icon">
                {getPlanIcon(plan.name)}
              </div>
              
              <h3 className="plan-name">{plan.name}</h3>
              
              <div className="plan-price">
                <span className="currency">$</span>
                <span className="amount">{plan.price}</span>
                <span className="period">/mo</span>
              </div>

              {plan.originalPrice && (
                <div className="plan-save">
                  <span className="original-price">${plan.originalPrice}</span>
                  <span className="save-badge">Save {plan.discount}%</span>
                </div>
              )}
              
              <ul className="plan-features">
                <li className="feature-item">
                  <FaCheck className="feature-icon" />
                  <span>{plan.websites} Websites</span>
                </li>
                <li className="feature-item">
                  <FaCheck className="feature-icon" />
                  <span>{plan.storage} SSD Storage</span>
                </li>
                <li className="feature-item">
                  <FaCheck className="feature-icon" />
                  <span>{plan.bandwidth} Bandwidth</span>
                </li>
                <li className="feature-item">
                  <FaCheck className="feature-icon" />
                  <span>Free SSL Certificate</span>
                </li>
                <li className="feature-item highlight">
                  <FaRocket className="feature-icon" />
                  <span>LiteSpeed Server</span>
                </li>
                <li className="feature-item">
                  <FaShieldAlt className="feature-icon" />
                  <span>DDoS Protection</span>
                </li>
              </ul>

              <button className="plan-btn">
                Get Started
                <span className="btn-arrow">→</span>
              </button>

              <div className="plan-guarantee">
                <FaShieldAlt className="guarantee-icon" />
                <span>30-Day Money-Back Guarantee</span>
              </div>
            </div>
          ))}
        </div>

        <div className="plans-footer">
          <div className="support-badge">
            <FaHeadset className="support-icon" />
            <div className="support-text">
              <strong>24/7 Customer Support</strong>
              <p>We're here to help you anytime</p>
            </div>
          </div>
          
          <div className="trust-badges">
            <span className="trust-item">
              <FaShieldAlt /> SSL Secured
            </span>
            <span className="trust-item">
              <FaDatabase /> Daily Backups
            </span>
            <span className="trust-item">
              <FaRocket /> 99.9% Uptime
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Plans