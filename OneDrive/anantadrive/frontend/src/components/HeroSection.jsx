import React from 'react'
import './HeroSection.css'

const HeroSection = () => {
  return (
    <section className="hero-section">
      {/* Video Background */}
      <video autoPlay muted loop playsInline className="hero-video-bg">
        <source src="/header-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Light Overlay - बहुत हल्का या हटा दिया */}
      <div className="hero-overlay-light"></div>

      {/* Content */}
      <div className="hero-content">
        <div className="content-box">
          <span className="hero-badge">
            <span className="badge-dot"></span>
            TRUSTED BY 500+ COMPANIES
          </span>

          <h1 className="hero-title">
            <span className="title-light">Welcome to</span>
            <span className="title-bold">Anantadrive</span>
          </h1>

          <p className="hero-description">
            Join thousands of businesses that trust us for their hosting needs
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">
              Get Started
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn-secondary">
              Talk to Us
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Experts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection