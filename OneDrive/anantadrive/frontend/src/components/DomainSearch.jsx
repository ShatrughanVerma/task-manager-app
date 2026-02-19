import React, { useState } from 'react'
import { FaSearch, FaCheck, FaTimes, FaShoppingCart } from 'react-icons/fa'
import './DomainSearch.css'

const DomainSearch = () => {
  const [domain, setDomain] = useState('')
  const [selectedTld, setSelectedTld] = useState('.com')
  const [searching, setSearching] = useState(false)
  const [availability, setAvailability] = useState(null)
  const [suggestions, setSuggestions] = useState([])

  const tlds = [
    { value: '.com', price: 9.99, popular: true },
    { value: '.in', price: 4.99, popular: true },
    { value: '.org', price: 8.99, popular: false },
    { value: '.net', price: 8.99, popular: false },
    { value: '.xyz', price: 2.99, popular: false },
    { value: '.online', price: 3.99, popular: false },
    { value: '.tech', price: 5.99, popular: false },
    { value: '.store', price: 6.99, popular: false }
  ]

  const popularTlds = tlds.filter(tld => tld.popular)

  const handleSearch = (e) => {
    e.preventDefault()
    if (!domain) return

    setSearching(true)
    setAvailability(null)
    
    // Simulate API call
    setTimeout(() => {
      const random = Math.random()
      const isAvailable = random > 0.4
      
      setAvailability({
        domain: domain + selectedTld,
        available: isAvailable,
        price: selectedTld === '.com' ? 9.99 : 
               selectedTld === '.in' ? 4.99 : 
               selectedTld === '.xyz' ? 2.99 : 8.99
      })

      // Generate suggestions
      if (!isAvailable) {
        setSuggestions([
          { domain: domain + '.co', available: true, price: 12.99 },
          { domain: domain + '.io', available: true, price: 29.99 },
          { domain: domain + 'app' + selectedTld, available: true, price: 8.99 },
          { domain: domain + 'site' + selectedTld, available: true, price: 7.99 }
        ])
      } else {
        setSuggestions([])
      }
      
      setSearching(false)
    }, 1500)
  }

  const handleAddToCart = (domainName, price) => {
    // Add to cart functionality
    alert(`✅ ${domainName} added to cart for $${price}/yr`)
  }

  const handleTryAnother = () => {
    setDomain('')
    setAvailability(null)
    setSuggestions([])
  }

  return (
    <section className="domain-search-section">
      <div className="container">
        <div className="domain-search-wrapper">
          <div className="domain-search-header">
            <h2 className="domain-search-title">Find Your Perfect Domain Name</h2>
            <p className="domain-search-subtitle">
              Get started with a domain that represents your brand. 
              Over 400+ extensions available.
            </p>
          </div>

          <form onSubmit={handleSearch} className="domain-search-form">
            <div className="search-input-group">
              <div className="domain-input-wrapper">
                <span className="domain-prefix">https://</span>
                <input
                  type="text"
                  className="domain-input"
                  placeholder="your-idea"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  required
                />
              </div>
              
              <select 
                className="tld-select"
                value={selectedTld}
                onChange={(e) => setSelectedTld(e.target.value)}
              >
                {tlds.map(tld => (
                  <option key={tld.value} value={tld.value}>
                    {tld.value} (${tld.price}/yr)
                  </option>
                ))}
              </select>

              <button 
                type="submit" 
                className="search-btn"
                disabled={searching}
              >
                {searching ? (
                  <>Searching...</>
                ) : (
                  <><FaSearch /> Search</>
                )}
              </button>
            </div>
          </form>

          {/* Popular TLDs */}
          <div className="popular-tlds">
            <span className="popular-tlds-label">Popular:</span>
            {popularTlds.map(tld => (
              <button
                key={tld.value}
                className={`tld-chip ${selectedTld === tld.value ? 'active' : ''}`}
                onClick={() => setSelectedTld(tld.value)}
              >
                {tld.value} <span className="tld-chip-price">${tld.price}</span>
              </button>
            ))}
          </div>

          {/* Search Results */}
          {searching && (
            <div className="search-loading">
              <div className="search-spinner"></div>
              <p>Checking availability...</p>
            </div>
          )}

          {availability && !searching && (
            <div className={`availability-result ${availability.available ? 'available' : 'unavailable'}`}>
              <div className="result-icon">
                {availability.available ? <FaCheck /> : <FaTimes />}
              </div>
              <div className="result-content">
                <h3 className="result-domain">{availability.domain}</h3>
                {availability.available ? (
                  <>
                    <p className="result-message">
                      Congratulations! This domain is <span className="highlight">available</span>
                    </p>
                    <div className="result-price">${availability.price}/year</div>
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(availability.domain, availability.price)}
                    >
                      <FaShoppingCart /> Add to Cart
                    </button>
                  </>
                ) : (
                  <>
                    <p className="result-message">
                      Sorry, <span className="highlight">not available</span>
                    </p>
                    <button 
                      className="try-again-btn"
                      onClick={handleTryAnother}
                    >
                      Try another domain
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="suggestions-section">
              <h3 className="suggestions-title">You might also like:</h3>
              <div className="suggestions-grid">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="suggestion-card">
                    <div className="suggestion-info">
                      <span className="suggestion-domain">{suggestion.domain}</span>
                      <span className="suggestion-price">${suggestion.price}/yr</span>
                    </div>
                    <button 
                      className="suggestion-add-btn"
                      onClick={() => handleAddToCart(suggestion.domain, suggestion.price)}
                    >
                      <FaShoppingCart />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Domain Pricing Table */}
          <div className="domain-pricing">
            <h3 className="pricing-title">Domain Pricing</h3>
            <div className="pricing-grid">
              {tlds.map(tld => (
                <div key={tld.value} className="pricing-card">
                  <span className="pricing-tld">{tld.value}</span>
                  <span className="pricing-price">${tld.price}/yr</span>
                  {tld.popular && <span className="popular-badge">Popular</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="domain-features">
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <div className="feature-text">
                <h4>Free Privacy Protection</h4>
                <p>Keep your personal information safe</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <div className="feature-text">
                <h4>Instant Activation</h4>
                <p>Your domain is ready in minutes</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔄</span>
              <div className="feature-text">
                <h4>Free DNS Management</h4>
                <p>Easy DNS control panel</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💯</span>
              <div className="feature-text">
                <h4>Money Back Guarantee</h4>
                <p>30-day money-back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DomainSearch