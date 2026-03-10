'use client';

import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [counters, setCounters] = useState({ drives: 0, customers: 0, vehicles: 0, experience: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // WhatsApp Configuration
  const whatsappNumber = '919876543210'; // Replace with actual number
  const whatsappMessage = encodeURIComponent('Hello! I would like to book a cab service.');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Hero Slider Images
  const heroSlides = [
    {
      image: 'https://roadrunnercabs.in/wp-content/uploads/2024/12/WhatsApp-Image-2024-12-17-at-14.54.52-e1734431983863.jpeg',
      title: 'Premium Luxury Cars'
    },
    {
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80',
      title: 'Executive Fleet'
    },
    {
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
      title: 'Wedding Specials'
    }
  ];

  // Extended Reviews for Slider
  const reviews = [
    { name: 'Ravi Sharma', rating: 5, text: 'Exceptional service that exceeded all expectations. The attention to detail and professionalism was truly remarkable. Highly recommended!', location: 'Mumbai' },
    { name: 'Pooja Verma', rating: 5, text: 'The epitome of luxury travel. From booking to drop-off, every touchpoint was handled with utmost care and precision.', location: 'Delhi' },
    { name: 'Amit Ahmed', rating: 5, text: 'A transformative travel experience. The fleet quality and driver expertise set a new benchmark in the industry.', location: 'Bangalore' },
    { name: 'Sneha Patel', rating: 5, text: 'Best cab service I have ever used. Punctual, professional, and the cars are immaculate. Will definitely use again!', location: 'Ahmedabad' },
    { name: 'Rajesh Kumar', rating: 5, text: 'Outstanding service for our corporate events. The team went above and beyond to ensure everything was perfect.', location: 'Pune' },
    { name: 'Priya Singh', rating: 5, text: 'Made our wedding day even more special with their beautifully decorated vintage cars. Thank you RoadRunner!', location: 'Jaipur' },
    { name: 'Vikram Reddy', rating: 5, text: 'Reliable airport transfers every single time. Never missed a flight because of their punctuality.', location: 'Hyderabad' },
    { name: 'Anita Desai', rating: 5, text: 'The helicopter booking service was seamless. A truly premium experience from start to finish.', location: 'Chennai' },
  ];

  // Auto slide functionality for hero
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [heroSlides.length]);

  // Auto slide functionality for reviews
  useEffect(() => {
    const reviewInterval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(reviewInterval);
  }, [reviews.length]);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsVisible) {
          setStatsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [statsVisible]);

  // Close video modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setVideoModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (videoModalOpen || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [videoModalOpen, mobileMenuOpen]);

  const animateCounters = () => {
    const targets = { drives: 10, customers: 9, vehicles: 100, experience: 3 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setCounters({
        drives: Math.floor(targets.drives * progress),
        customers: Math.floor(targets.customers * progress),
        vehicles: Math.floor(targets.vehicles * progress),
        experience: Math.floor(targets.experience * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, interval);
  };

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index) => {
    setCurrentReview(index);
  };

  // Open WhatsApp with custom message
  const openWhatsApp = (customMessage) => {
    const message = encodeURIComponent(customMessage || 'Hello! I would like to book a cab service.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  // 8 Services as requested
  const services = [
    { 
      title: 'Hotel Booking', 
      desc: 'Seamless hotel reservations at premium properties. From luxury resorts to boutique hotels, we handle your accommodation needs with exclusive deals.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4M4 21V10.87M20 21V10.87"/>
        </svg>
      )
    },
    { 
      title: 'Flight Ticket Booking', 
      desc: 'Hassle-free flight bookings with competitive fares. We compare airlines and find you the best deals for domestic and international travel.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
        </svg>
      )
    },
    { 
      title: 'Helicopter Booking', 
      desc: 'Experience aerial luxury with our helicopter charter services. Perfect for business executives, special occasions, and scenic tours.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
          <line x1="4" y1="22" x2="4" y2="15"/>
        </svg>
      )
    },
    { 
      title: 'Bus Ticket', 
      desc: 'Book comfortable bus journeys across all major routes. Choose from AC sleeper, semi-sleeper, and luxury coaches with real-time tracking.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 6v6M15 6v6M2 12h19.6M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/>
          <circle cx="7" cy="18" r="2"/>
          <path d="M9 18h5"/>
          <circle cx="16" cy="18" r="2"/>
        </svg>
      )
    },
    { 
      title: 'Railway Booking', 
      desc: 'Quick and easy train ticket reservations. Access to all classes, Tatkal bookings, and premium trains with instant confirmation.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="3" width="16" height="16" rx="2"/>
          <path d="M4 11h16M12 3v8M8 19l-2 3M16 19l2 3M9 15h0M15 15h0"/>
        </svg>
      )
    },
    { 
      title: 'Corporate Booking', 
      desc: 'Tailored travel solutions for businesses. Dedicated account management, corporate rates, monthly invoicing, and 24/7 executive support.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          <rect width="20" height="14" x="2" y="6" rx="2"/>
        </svg>
      )
    },
    { 
      title: 'Wedding Event', 
      desc: 'Make your special day extraordinary with our premium wedding fleet. Vintage cars, luxury sedans, and decorated vehicles.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      )
    },
    { 
      title: 'Airport Transfers', 
      desc: 'Punctual airport pickups and drops with flight tracking. Professional chauffeurs and meet and greet services available.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 22h20"/>
          <path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2L22 5"/>
          <path d="m22 5-3 12-7.8-5.8"/>
        </svg>
      )
    },
  ];

  const carCategories = [
    { 
      name: 'Vintage Cars', 
      seats: 5, 
      passengers: 4, 
      ac: true, 
      fuel: 'Petrol', 
      price: '2500 - 5000',
      image: 'https://roadrunnercabs.in/wp-content/uploads/2024/12/WhatsApp-Image-2024-12-17-at-14.54.52-e1734431983863.jpeg',
      tag: 'Classic'
    },
    { 
      name: 'Super Cars', 
      seats: 5, 
      passengers: 4, 
      ac: true, 
      fuel: 'Petrol', 
      price: '5000 - 12000',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
      tag: 'Premium'
    },
    { 
      name: 'Tempo Traveller', 
      seats: 9, 
      passengers: 8, 
      ac: true, 
      fuel: 'Diesel', 
      price: '2500 - 5000',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&auto=format&fit=crop&q=80',
      tag: 'Group'
    },
  ];

  const cabRoutes = [
    { name: 'Indore to Bhopal', distance: '195 km', time: '3.5 hrs' },
    { name: 'Indore to Ujjain', distance: '55 km', time: '1 hr' },
    { name: 'Indore to Mandu', distance: '100 km', time: '2 hrs' },
    { name: 'Indore to Maheshwar', distance: '90 km', time: '2 hrs' },
    { name: 'Indore to Omkareshwar', distance: '77 km', time: '1.5 hrs' },
    { name: 'Indore to Mumbai', distance: '585 km', time: '10 hrs' },
  ];

  const features = [
    { title: 'Transparent Pricing', desc: 'No hidden charges. What you see is what you pay.' },
    { title: 'Premium Fleet', desc: 'Meticulously maintained vehicles for your comfort.' },
    { title: '24/7 Support', desc: 'Round the clock assistance at your fingertips.' },
    { title: 'Verified Drivers', desc: 'Background-checked, professionally trained chauffeurs.' },
    { title: 'Real-time Tracking', desc: 'Track your ride live for complete peace of mind.' },
    { title: 'Flexible Booking', desc: 'Easy cancellation and modification policies.' },
  ];

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      {/* Gradient Mesh Background */}
      <div className="gradient-mesh"></div>
      
      {/* Noise Texture Overlay */}
      <div className="noise-overlay"></div>

      {/* Video Modal with Close Button */}
      {videoModalOpen && (
        <div className="video-modal-overlay" onClick={() => setVideoModalOpen(false)}>
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setVideoModalOpen(false)} aria-label="Close video">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              <span>Close</span>
            </button>
            <div className="video-modal-content">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="RoadRunner Cabs Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="header-content">
          <div className="logo">
            <img 
              src="https://roadrunnercabs.in/wp-content/uploads/2024/12/WhatsApp_Image_2024-12-15_at_13.57.49-removebg-preview1.png" 
              alt="RoadRunner Cabs Logo"
              className="logo-image"
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <a href="#" className="nav-link active">Home</a>
            <a href="#cars" className="nav-link">Fleet</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#routes" className="nav-link">Routes</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
          
          <button className="cta-button header-cta" onClick={() => openWhatsApp('Hello! I would like to book a cab.')}>
            <span>Book Now</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          
          {/* Animated Hamburger Menu */}
          <button 
            className={`hamburger ${mobileMenuOpen ? 'hamburger-active' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line hamburger-line-1"></span>
            <span className="hamburger-line hamburger-line-2"></span>
            <span className="hamburger-line hamburger-line-3"></span>
          </button>
        </div>
        
        {/* Mobile Navigation Overlay */}
        <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'mobile-nav-overlay-active' : ''}`} onClick={closeMenu}></div>
        
        {/* Mobile Navigation Menu */}
        <nav className={`nav-mobile ${mobileMenuOpen ? 'nav-mobile-open' : ''}`}>
          <div className="nav-mobile-header">
            <img 
              src="https://roadrunnercabs.in/wp-content/uploads/2024/12/WhatsApp_Image_2024-12-15_at_13.57.49-removebg-preview1.png" 
              alt="RoadRunner Cabs"
              className="nav-mobile-logo"
            />
            <button className="nav-mobile-close" onClick={closeMenu}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="nav-mobile-links">
            <a href="#" className="nav-mobile-link" onClick={closeMenu} style={{animationDelay: '0.1s'}}>
              <span className="nav-mobile-link-number">01</span>
              <span className="nav-mobile-link-text">Home</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#cars" className="nav-mobile-link" onClick={closeMenu} style={{animationDelay: '0.15s'}}>
              <span className="nav-mobile-link-number">02</span>
              <span className="nav-mobile-link-text">Fleet</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#services" className="nav-mobile-link" onClick={closeMenu} style={{animationDelay: '0.2s'}}>
              <span className="nav-mobile-link-number">03</span>
              <span className="nav-mobile-link-text">Services</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#routes" className="nav-mobile-link" onClick={closeMenu} style={{animationDelay: '0.25s'}}>
              <span className="nav-mobile-link-number">04</span>
              <span className="nav-mobile-link-text">Routes</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#contact" className="nav-mobile-link" onClick={closeMenu} style={{animationDelay: '0.3s'}}>
              <span className="nav-mobile-link-number">05</span>
              <span className="nav-mobile-link-text">Contact</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
          <div className="nav-mobile-footer">
            <button className="nav-mobile-cta" onClick={() => { closeMenu(); openWhatsApp('Hello! I would like to book a ride.'); }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>Book on WhatsApp</span>
            </button>
            <div className="nav-mobile-social">
              <a href="#" className="nav-mobile-social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="nav-mobile-social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="nav-mobile-social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section with Slider */}
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span>Premium Cab Services</span>
            </div>
            <h1 className="hero-title">
              <span className="title-line">Own Your Dream</span>
              <span className="title-line">Destination</span>
              <span className="title-line accent">With Us</span>
            </h1>
            <p className="hero-subtitle">
              Experience luxury travel redefined. Premium vehicles, professional chauffeurs, 
              and seamless journeys across India.
            </p>
            <div className="hero-features">
              <div className="hero-feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Best Price Guaranteed</span>
              </div>
              <div className="hero-feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Home Pickups</span>
              </div>
              <div className="hero-feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>24/7 Support</span>
              </div>
            </div>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => openWhatsApp('Hello! I would like to get started with your cab services.')}>
                <span>Get Started</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button className="btn-ghost" onClick={() => setVideoModalOpen(true)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
                <span>Watch Video</span>
              </button>
            </div>
          </div>
          
          {/* Hero Slider */}
          <div className="hero-visual">
            <div className="hero-slider">
              <div className="hero-slider-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {heroSlides.map((slide, index) => (
                  <div key={index} className="hero-slide">
                    <div className="hero-image-glow"></div>
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="hero-image"
                    />
                    <div className="hero-image-reflection"></div>
                  </div>
                ))}
              </div>
              
              {/* Slider Controls */}
              <button className="slider-btn slider-btn-prev" onClick={prevSlide}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button className="slider-btn slider-btn-next" onClick={nextSlide}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
              
              {/* Slider Dots */}
              <div className="slider-dots">
                {heroSlides.map((_, index) => (
                  <button 
                    key={index}
                    className={`slider-dot ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                  ></button>
                ))}
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="floating-card card-1">
              <div className="floating-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="floating-card-content">
                <span className="floating-card-value">100+</span>
                <span className="floating-card-label">Premium Vehicles</span>
              </div>
            </div>
            <div className="floating-card card-2">
              <div className="floating-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="floating-card-content">
                <span className="floating-card-value">9K+</span>
                <span className="floating-card-label">Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator - Positioned Lower for Mobile */}
        <div className="scroll-indicator">
          <div className="scroll-content">
            <div className="scroll-mouse">
              <div className="scroll-wheel"></div>
            </div>
            <span className="scroll-text">Scroll to explore</span>
          </div>
          <div className="scroll-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <span className="section-tag">About Us</span>
              <h2 className="section-title">
                Redefining Premium<br/>
                <span className="accent">Travel Experience</span>
              </h2>
              <p className="about-text">
                Welcome to <strong>RoadRunner Cabs</strong>, where luxury meets reliability. 
                We are your trusted partner for premium cab services across India, specializing 
                in delivering exceptional travel experiences that transcend ordinary transportation.
              </p>
              <p className="about-text">
                From airport transfers to wedding celebrations, our meticulously maintained fleet 
                and professionally trained chauffeurs ensure every journey is memorable.
              </p>
              <div className="about-stats">
                <div className="about-stat">
                  <span className="about-stat-value">10K+</span>
                  <span className="about-stat-label">Rides Completed</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-value">50+</span>
                  <span className="about-stat-label">Cities Covered</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-value">99%</span>
                  <span className="about-stat-label">Satisfaction Rate</span>
                </div>
              </div>
            </div>
            <div className="about-visual">
              <div className="about-image-stack">
                <div className="about-image about-image-1">
                  <img src="https://roadrunnercabs.in/wp-content/uploads/2024/12/WhatsApp-Image-2024-12-17-at-14.54.52-e1734431983863.jpeg" alt="Premium Service" />
                </div>
                <div className="about-image about-image-2">
                  <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&auto=format&fit=crop&q=80" alt="Luxury Fleet" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="cars" className="fleet-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Fleet</span>
            <h2 className="section-title">
              Premium Vehicles for<br/>
              <span className="accent">Every Occasion</span>
            </h2>
          </div>
          <div className="fleet-grid">
            {carCategories.map((car, index) => (
              <div key={index} className="fleet-card" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="fleet-card-image">
                  <img src={car.image} alt={car.name} />
                  <div className="fleet-card-tag">{car.tag}</div>
                  <div className="fleet-card-overlay">
                    <button className="fleet-card-btn" onClick={() => openWhatsApp(`Hello! I would like to know more about ${car.name}.`)}>View Details</button>
                  </div>
                </div>
                <div className="fleet-card-content">
                  <h3 className="fleet-card-name">{car.name}</h3>
                  <div className="fleet-card-specs">
                    <div className="fleet-spec">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                      </svg>
                      <span>{car.passengers} Passengers</span>
                    </div>
                    <div className="fleet-spec">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="10" rx="2"/>
                        <path d="M12 11V6a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v5"/>
                      </svg>
                      <span>{car.seats} Seats</span>
                    </div>
                    <div className="fleet-spec">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                      <span>{car.fuel}</span>
                    </div>
                  </div>
                  <div className="fleet-card-footer">
                    <div className="fleet-price">
                      <span className="fleet-price-value">{car.price}</span>
                      <span className="fleet-price-unit">/hr</span>
                    </div>
                    <button className="fleet-book-btn" onClick={() => openWhatsApp(`Hello! I would like to book a ${car.name}. Price range: ${car.price}/hr`)}>Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - 8 Services Grid */}
      <section id="services" className="services-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Our Services</span>
            <h2 className="section-title">
              Comprehensive Travel<br/>
              <span className="accent">Solutions</span>
            </h2>
            <p className="section-subtitle">From cab rentals to complete travel management, we offer end-to-end services for all your journey needs.</p>
          </div>
          <div className="services-grid-new">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`service-card-new ${activeService === index ? 'active' : ''}`}
                onClick={() => setActiveService(index)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="service-card-icon">
                  {service.icon}
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.desc}</p>
                <button className="service-card-btn" onClick={(e) => { e.stopPropagation(); openWhatsApp(`Hello! I am interested in your ${service.title} service.`); }}>
                  <span>Book Now</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Routes Section */}
      <section id="routes" className="routes-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Popular Routes</span>
            <h2 className="section-title">
              Choose Your<br/>
              <span className="accent">Destination</span>
            </h2>
          </div>
          <div className="routes-grid">
            {cabRoutes.map((route, index) => (
              <div key={index} className="route-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="route-card-image">
                  <img src="https://roadrunnercabs.in/wp-content/uploads/2024/12/WhatsApp-Image-2024-12-17-at-14.54.52-e1734431983863.jpeg" alt={route.name} />
                  <div className="route-card-overlay"></div>
                </div>
                <div className="route-card-content">
                  <h4 className="route-name">{route.name}</h4>
                  <div className="route-meta">
                    <span className="route-distance">{route.distance}</span>
                    <span className="route-divider"></span>
                    <span className="route-time">{route.time}</span>
                  </div>
                  <button className="route-btn" onClick={() => openWhatsApp(`Hello! I would like to book a ride for ${route.name} (${route.distance}, approx ${route.time}).`)}>
                    <span>Book Ride</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="stats-bg-pattern"></div>
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <span className="stat-value">{counters.drives}K+</span>
              <span className="stat-label">Completed Drives</span>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <span className="stat-value">{counters.customers}K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <span className="stat-value">{counters.vehicles}+</span>
              <span className="stat-label">Premium Vehicles</span>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <span className="stat-value">{counters.experience}+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title">
              Excellence in<br/>
              <span className="accent">Every Detail</span>
            </h2>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="feature-number">0{index + 1}</div>
                <h4 className="feature-title">{feature.title}</h4>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section with Slider */}
      <section className="reviews-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Testimonials</span>
            <h2 className="section-title">
              What Our Clients<br/>
              <span className="accent">Say About Us</span>
            </h2>
          </div>
          
          {/* Reviews Slider */}
          <div className="reviews-slider">
            <div className="reviews-slider-container">
              <div 
                className="reviews-slider-track" 
                style={{ transform: `translateX(-${currentReview * 100}%)` }}
              >
                {reviews.map((review, index) => (
                  <div key={index} className="review-slide">
                    <div className="review-card-slider">
                      <div className="review-quote">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" opacity="0.1">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                      </div>
                      <div className="review-rating">
                        {[...Array(review.rating)].map((_, i) => (
                          <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                          </svg>
                        ))}
                      </div>
                      <p className="review-text">"{review.text}"</p>
                      <div className="review-author">
                        <div className="review-avatar">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="review-author-info">
                          <span className="review-name">{review.name}</span>
                          <span className="review-location">{review.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Reviews Slider Controls */}
            <button className="review-slider-btn review-slider-prev" onClick={prevReview}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button className="review-slider-btn review-slider-next" onClick={nextReview}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
            
            {/* Reviews Slider Dots */}
            <div className="reviews-slider-dots">
              {reviews.map((_, index) => (
                <button 
                  key={index}
                  className={`review-slider-dot ${currentReview === index ? 'active' : ''}`}
                  onClick={() => goToReview(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="cta-section">
        <div className="cta-glow"></div>
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Experience<br/><span className="accent">Premium Travel?</span></h2>
            <p className="cta-subtitle">Book your ride now and discover the difference of traveling with RoadRunner Cabs.</p>
            <button className="cta-btn" onClick={() => openWhatsApp('Hello! I would like to book a premium ride with RoadRunner Cabs.')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>Book on WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img 
                src="https://roadrunnercabs.in/wp-content/uploads/2024/12/WhatsApp_Image_2024-12-15_at_13.57.49-removebg-preview1.png" 
                alt="RoadRunner Cabs"
                className="footer-logo"
              />
              <p className="footer-desc">
                Premium cab services redefined. Experience luxury, reliability, and 
                excellence in every journey.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href={whatsappLink} className="social-link" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-links">
              <h4 className="footer-title">Quick Links</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#cars">Our Fleet</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#routes">Routes</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4 className="footer-title">Services</h4>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openWhatsApp('Hello! I am interested in Hotel Booking service.'); }}>Hotel Booking</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openWhatsApp('Hello! I am interested in Flight Booking service.'); }}>Flight Booking</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openWhatsApp('Hello! I am interested in Corporate Booking service.'); }}>Corporate Booking</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openWhatsApp('Hello! I am interested in Wedding Cars service.'); }}>Wedding Cars</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openWhatsApp('Hello! I am interested in Airport Transfers service.'); }}>Airport Transfers</a></li>
              </ul>
            </div>
            <div className="footer-contact-section">
              <h4 className="footer-title">Contact Us</h4>
              <div className="footer-contact">
                <div className="contact-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>+91 98765 43210</span>
                </div>
                <div className="contact-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>info@roadrunnercabs.in</span>
                </div>
                <div className="contact-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>Indore, Madhya Pradesh</span>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>2024 RoadRunner Cabs. All Rights Reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={whatsappLink} 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}

export default App;
