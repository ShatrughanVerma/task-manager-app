import React from 'react'
import { 
  FaRocket, 
  FaShieldAlt, 
  FaClock, 
  FaHeadset, 
  FaChartLine, 
  FaDatabase,
  FaCode,
  FaGlobe,
  FaLock,
  FaSync,
  FaCloud,
  FaHeart
} from 'react-icons/fa'
import './Features.css'

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <FaRocket />,
      title: 'Lightning Fast Speed',
      description: 'SSD servers and optimized stack for 3x faster loading times. Your website will load in milliseconds.',
      color: '#4f46e5'
    },
    {
      id: 2,
      icon: <FaShieldAlt />,
      title: 'Advanced Security',
      description: 'Free SSL certificates, DDoS protection, and automated daily backups to keep your data safe.',
      color: '#10b981'
    },
    {
      id: 3,
      icon: <FaClock />,
      title: '99.9% Uptime Guarantee',
      description: 'We guarantee your website stays online with our enterprise-grade infrastructure and monitoring.',
      color: '#f59e0b'
    },
    {
      id: 4,
      icon: <FaHeadset />,
      title: '24/7 Expert Support',
      description: 'Our technical support team is available round the clock via live chat, email, and phone.',
      color: '#ef4444'
    },
    {
      id: 5,
      icon: <FaChartLine />,
      title: 'Easy Scalability',
      description: 'Start small and scale up effortlessly as your website grows. Upgrade resources with one click.',
      color: '#8b5cf6'
    },
    {
      id: 6,
      icon: <FaDatabase />,
      title: 'Automated Backups',
      description: 'Daily automated backups with one-click restore. Never lose your valuable data.',
      color: '#ec4899'
    },
    {
      id: 7,
      icon: <FaCode />,
      title: 'Developer Friendly',
      description: 'SSH access, Git integration, WP-CLI, and support for multiple PHP versions.',
      color: '#14b8a6'
    },
    {
      id: 8,
      icon: <FaGlobe />,
      title: 'Global Data Centers',
      description: 'Choose from 15+ data centers worldwide for the best performance for your audience.',
      color: '#f97316'
    }
  ]

  const stats = [
    { value: '1M+', label: 'Happy Customers', icon: '😊' },
    { value: '99.9%', label: 'Uptime Guarantee', icon: '⏱️' },
    { value: '24/7', label: 'Expert Support', icon: '🎧' },
    { value: '30-Day', label: 'Money Back', icon: '💰' }
  ]

  return (
    <section className="features-section">
      {/* Stats Counter */}
      <div className="stats-container">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <span className="stat-icon">{stat.icon}</span>
                <div className="stat-info">
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Header */}
      <div className="container">
        <div className="features-header">
          <h2 className="features-title">
            Why Choose <span className="highlight">Anantadrive?</span>
          </h2>
          <p className="features-subtitle">
            We provide everything you need to build and grow your online presence
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div 
                className="feature-icon-wrapper"
                style={{ backgroundColor: `${feature.color}20` }} // 20% opacity
              >
                <div 
                  className="feature-icon"
                  style={{ color: feature.color }}
                >
                  {feature.icon}
                </div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div 
                className="feature-hover-line"
                style={{ backgroundColor: feature.color }}
              ></div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="trust-badges">
          <h3 className="trust-title">Trusted by thousands of businesses worldwide</h3>
          <div className="badges-container">
            <div className="badge">
              <span className="badge-icon">🔒</span>
              <span>SSL Secured</span>
            </div>
            <div className="badge">
              <span className="badge-icon">💰</span>
              <span>30-Day Refund</span>
            </div>
            <div className="badge">
              <span className="badge-icon">⚡</span>
              <span>LiteSpeed Server</span>
            </div>
            <div className="badge">
              <span className="badge-icon">🌐</span>
              <span>Global CDN</span>
            </div>
            <div className="badge">
              <span className="badge-icon">📧</span>
              <span>Free Email</span>
            </div>
            <div className="badge">
              <span className="badge-icon">🔄</span>
              <span>Daily Backups</span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="features-cta">
          <div className="cta-content">
            <h3>Ready to get started?</h3>
            <p>Join over 1 million website owners who trust Hostinger Clone</p>
            <button className="cta-button">
              <span>Start Your Journey Today</span>
              <FaHeart className="cta-icon" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features