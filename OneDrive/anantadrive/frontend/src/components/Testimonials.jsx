import React, { useState, useEffect } from 'react'
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import './Testimonials.css'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [autoplay, setAutoplay] = useState(true)

  // Sample testimonials data
  const testimonialsData = [
    {
      id: 1,
      name: 'Rahul Sharma',
      role: 'Web Developer',
      company: 'TechSolutions Inc.',
      content: 'Hostinger Clone has been a game-changer for my business. The speed and reliability are unmatched. My websites load in milliseconds!',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'E-commerce Owner',
      company: 'FashionHub',
      content: 'The customer support is absolutely amazing! They helped me migrate my entire store in just 2 hours. 10/10 recommend!',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      date: '2024-02-20'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      role: 'Blogger',
      company: 'TechBlog India',
      content: 'Best hosting for WordPress sites. The 1-click installation and automatic updates save me so much time. Uptime has been perfect!',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/46.jpg',
      date: '2024-03-10'
    },
    {
      id: 4,
      name: 'Neha Singh',
      role: 'Digital Marketer',
      company: 'GrowthGurus',
      content: 'The SEO tools and analytics provided are top-notch. My client sites rank better and load faster. Worth every penny!',
      rating: 4,
      image: 'https://randomuser.me/api/portraits/women/63.jpg',
      date: '2024-03-25'
    },
    {
      id: 5,
      name: 'Vikram Mehta',
      role: 'Startup Founder',
      company: 'InnovateLabs',
      content: 'As a startup, we needed affordable yet reliable hosting. Hostinger Clone delivered beyond our expectations!',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      date: '2024-04-01'
    },
    {
      id: 6,
      name: 'Anjali Desai',
      role: 'Photographer',
      company: 'Desai Photography',
      content: 'Perfect for hosting my portfolio. The CDN makes sure my images load fast anywhere in the world!',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/17.jpg',
      date: '2024-04-12'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTestimonials(testimonialsData)
      setLoading(false)
    }, 1000)
  }, [])

  // Autoplay functionality
  useEffect(() => {
    let interval
    if (autoplay && testimonials.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  const handlePrevious = () => {
    setAutoplay(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setAutoplay(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handleDotClick = (index) => {
    setAutoplay(false)
    setCurrentIndex(index)
  }

  // Render stars based on rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar 
        key={index} 
        className={`star ${index < rating ? 'filled' : ''}`} 
      />
    ))
  }

  // Calculate average rating
  const averageRating = testimonials.length > 0
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : 0

  if (loading) {
    return (
      <section className="testimonials-section">
        <div className="container">
          <div className="testimonials-loading">
            <div className="loading-spinner"></div>
            <p>Loading testimonials...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">
            What Our <span className="highlight">Customers Say</span>
          </h2>
          <p className="testimonials-subtitle">
            Join thousands of satisfied customers who trust Hostinger Clone
          </p>
        </div>

        {/* Statistics */}
        <div className="testimonials-stats">
          <div className="stat-item">
            <span className="stat-number">10,000+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{averageRating}</span>
            <span className="stat-label">Average Rating</span>
            <div className="stat-stars">
              {renderStars(Math.round(averageRating))}
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Countries</span>
          </div>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="testimonials-carousel">
          <button 
            className="carousel-nav prev"
            onClick={handlePrevious}
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>

          <div className="carousel-container">
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="testimonial-content">
                    <FaQuoteLeft className="quote-icon" />
                    <p className="testimonial-text">"{testimonial.content}"</p>
                    <div className="testimonial-rating">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  
                  <div className="testimonial-author">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="author-image"
                    />
                    <div className="author-info">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-role">
                        {testimonial.role} at {testimonial.company}
                      </p>
                      <span className="review-date">
                        {new Date(testimonial.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="carousel-nav next"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Autoplay Toggle */}
        <div className="autoplay-toggle">
          <label className="switch">
            <input 
              type="checkbox" 
              checked={autoplay}
              onChange={(e) => setAutoplay(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <span className="autoplay-label">
            {autoplay ? 'Auto-rotate on' : 'Auto-rotate off'}
          </span>
        </div>

        {/* Grid View of All Testimonials */}
        <div className="testimonials-grid">
          <h3 className="grid-title">More Reviews</h3>
          <div className="grid-container">
            {testimonials.map((testimonial) => (
              <div key={`grid-${testimonial.id}`} className="grid-card">
                <div className="grid-card-header">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="grid-author-image"
                  />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
                <div className="grid-card-rating">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="grid-card-text">"{testimonial.content.substring(0, 100)}..."</p>
                <span className="grid-card-date">{testimonial.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="trust-badges">
          <div className="trust-badge">
            <span className="badge-icon">⭐</span>
            <div>
              <strong>4.8/5 Rating</strong>
              <p>Based on 10k+ reviews</p>
            </div>
          </div>
          <div className="trust-badge">
            <span className="badge-icon">🔒</span>
            <div>
              <strong>Verified Reviews</strong>
              <p>100% authentic</p>
            </div>
          </div>
          <div className="trust-badge">
            <span className="badge-icon">🌐</span>
            <div>
              <strong>Global Customers</strong>
              <p>50+ countries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials