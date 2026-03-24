import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import Plans from '../components/Plans'
import DomainSearch from '../components/DomainSearch'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import './HomePage.css'

const HomePage = () => {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setPlans([
        { _id: '1', name: 'Basic', price: 2.99, websites: 1, storage: '10 GB', bandwidth: '100 GB' },
        { _id: '2', name: 'Premium', price: 4.99, websites: 10, storage: '50 GB', bandwidth: '500 GB' },
        { _id: '3', name: 'Business', price: 8.99, websites: 100, storage: '200 GB', bandwidth: 'Unlimited' }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="homepage">
      <Header />
      <HeroSection />
      <DomainSearch />
      <Plans plans={plans} loading={loading} />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default HomePage