import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Base from '../Base'
import axios from 'axios'
import Counter from "../compoenents/Counter";
import Ratingstar from '../compoenents/Ratingstar';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../config';

const Homepage = () => {
  const [travels, setTravels] = useState([])
  const [favorites, setFavorites] = useState([])
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const toggleFav = (id) => {
    if (localStorage.getItem('isLoggedIn') !== 'true') return toast.error('Please log in first.')
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
      return updatedFavorites
    })
  }

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'))
  }, [])

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/travels?format=json`)
      .then((res) => setTravels(res.data))
      .catch((err) => console.log(err))
  }, [])


  const [guides, setGuides] = useState([])

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/guides/?format=json`)
      .then((res) => setGuides(res.data))
      .catch((err) => console.log(err))
  }, [])


  const [reviews, setReviews] = useState([])

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/reviews/?format=json`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err))

  }, [])

  const handleNewsletterSubscribe = (e) => {
    e.preventDefault()
    const email = newsletterEmail.trim()

    if (!email) return toast.error('Please enter your email address.')

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) return toast.error('Please enter a valid email address.')

    toast.success('Thank you for being our member. We will keep you updated with the latest offers and updates.')
    setNewsletterEmail('')
  }

  const openVideoPopup = () => setIsVideoOpen(true)
  const closeVideoPopup = () => setIsVideoOpen(false)




  return (
    <>
      {/* <!-- ==================== HERO ==================== --> */}
      <section className="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-particles">
          <span></span><span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div className="container hero-content">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-badge">
                <i className="bi bi-stars"></i>
                #1 Travel Agency in Nepal
              </div>
              <h1 className="hero-title">
                Explore the <span className="highlight">World</span> with<br />Bimal Travels
              </h1>
              <p className="hero-subtitle">
                Discover breathtaking destinations, expert guides, and unforgettable adventures. Your dream journey starts here.
              </p>
              <div className="hero-cta-group">
                <Link to={"/travels"} className="btn-accent">
                  <i className="bi bi-compass me-2"></i>Explore Tours
                </Link>
                <button type="button" onClick={openVideoPopup} className="btn-accent-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)', background: 'transparent' }}>
                  <i className="bi bi-play-circle me-2"></i>Watch Video
                </button>
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-number counter-num">

                    <Counter end={5000} />
                  </div>
                  <div className="hero-stat-label">Happy Travelers</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number counter-num">
                    <Counter end={120} />

                  </div>
                  <div className="hero-stat-label">Tour Packages</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number counter-num">

                    <Counter end={15} />
                  </div>
                  <div className="hero-stat-label">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0  rounded-4" >
              <video src={"video1.mp4"} autoPlay muted loop playsInline className="w-100  rounded-4"></video>
            </div>
          </div>
        </div>
      </section>



      {/* Featured Tours Section */}
      <section className="featured-section counter-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-badge">Top Picks</span>
            <h2 className="section-title">
              Featured <span className="text-accent">Tours</span>
            </h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">
              Hand-picked adventures crafted for every type of traveler
            </p>
          </div>

          <div className="row g-4">


            {

              travels.filter((item, i) => item.trending === true).map((item) => (
                <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration="1000" key={item.id}>
                  <div className="tour-card">
                    <div className="tour-card-img">
                      <img
                        src={item.image}
                        alt={item.title}
                      />
                      {item.trending ? <span className="tour-card-badge">Trending</span> : null}
                      <button
                        className="tour-card-wishlist"
                        type="button"
                        onClick={() => toggleFav(item.id)}
                      >
                        <i
                          className={favorites.includes(item.id) ? "bi bi-heart-fill" : "bi bi-heart"}
                          style={{ color: favorites.includes(item.id) ? '#ef4444' : '#000' }}
                        ></i>
                      </button>
                    </div>
                    <div className="tour-card-body">
                      <div className="tour-card-region">
                        <i className="bi bi-geo-alt-fill text-accent"></i>{' '}
                        {item.region}
                      </div>
                      <h3 className="tour-card-title">{item.title}</h3>
                      <div className="tour-card-meta">
                        <span className="tour-meta-item">
                          <i className="bi bi-clock text-accent"></i> {item.time_of_completion} Days
                        </span>
                        <span className="tour-meta-item">
                          <i className="bi bi-bar-chart text-accent"></i> {item.difficulty}
                        </span>
                        <span className="tour-meta-item">
                          <i className="bi bi-people text-accent"></i> Max {item.max_people}
                        </span>
                      </div>
                      <div className="tour-card-footer">
                        <div className="tour-price">
                          <span className="tour-price-from">From</span>
                          <span className="tour-price-amount">
                            ${item.per_person_fee}
                          </span>
                          <span className="tour-price-per">/person</span>
                        </div>
                        <div className="d-flex flex-column align-items-end gap-2">

                          <div className="star-rating">
                            <Ratingstar rating={item.rating} />
                            <span className="count">({item.rating})</span>
                          </div>
                          <Link
                            to={`/tourdetail/${item.id}`}
                            className="btn-accent"
                            style={{ padding: '8px 18px', fontSize: '0.82rem' }}
                          >
                            View Tour
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}



      <section id="destinations-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-badge">Explore</span>
            <h2 className="section-title">
              Popular <span className="text-accent">Destinations</span>
            </h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">
              From towering Himalayas to tropical beaches find your next escape
            </p>
          </div>
          <div className="row g-4">
            {
              travels.slice(0, 5).map((item, i) => {
                return (
                  <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration="1000" key={item.id}>
                    <div className="dest-card">
                      <img
                        src={item.image}
                        alt={item.title}
                      />
                      <div className="dest-card-overlay">
                        <div className="dest-card-name">{item.title}</div>
                        <div className="dest-card-count">
                          <span>{item.details}</span> <span>{item.difficulty.toUpperCase()} </span> <span>-</span> Tour
                        </div>
                      </div>
                    </div>
                  </div>

                )

              }


              )
            }
            <div className="section-view-all">
              <Link to="/mybookings" className="btn-accent">
                <i className="bi bi-globe me-2"></i>View My Bookings
              </Link>
            </div>
          </div>


        </div>
      </section>




      {/* Why Choose Us Section */}
      <section className="why-us-section mt-5">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="text-center mb-5">
            <span className="section-badge" style={{ background: 'rgba(247,147,30,0.2)', color: 'var(--accent-light)' }}>Why Us</span>
            <h2 className="section-title" style={{ color: '#fff' }}>Why Choose <span className="text-accent">Bimal Travels?</span></h2>
            <div className="section-divider"></div>
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.7)' }}>We go above and beyond to create extraordinary travel experiences</p>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration="1000">
              <div className="why-card">
                <div className="why-icon"><i className="bi bi-shield-check"></i></div>
                <h4 className="why-title">100% Safe Travel</h4>
                <p className="why-desc">Your safety is our top priority. All our tours are carefully planned with risk assessments.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration="1000">
              <div className="why-card">
                <div className="why-icon"><i className="bi bi-award"></i></div>
                <h4 className="why-title">Expert Guides</h4>
                <p className="why-desc">Our certified guides bring years of local knowledge and passion to every tour.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration="1000">
              <div className="why-card">
                <div className="why-icon"><i className="bi bi-currency-dollar"></i></div>
                <h4 className="why-title">Best Price Guarantee</h4>
                <p className="why-desc">We match any lower price you find for the same tour or give you a full refund.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration="1000">
              <div className="why-card">
                <div className="why-icon"><i className="bi bi-headset"></i></div>
                <h4 className="why-title">24/7 Support</h4>
                <p className="why-desc">Our support team is always available to assist you before, during, and after your trip.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <form className="newsletter-form" onSubmit={handleNewsletterSubscribe}>
            <input type="email" className="form-control" placeholder="Enter your email address" autoComplete="email" required value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} />
            <button type="submit" className="btn-accent" style={{ border: 'none', whiteSpace: 'nowrap' }}>
              <i className="bi bi-send me-2"></i>Subscribe
            </button>
          </form>
        </div>
      </section>


      <section className="guides-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-badge">Meet The Team</span>
            <h2 className="section-title">Our Top <span className="text-accent">Guides</span></h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">Experienced local experts who know every trail and hidden gem</p>
          </div>
          <div className="row g-4">
            {
              guides.slice(0, 3).map((item) => {
                return (
                  <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration="1000" key={item.id}>
                    <div className="guide-card">
                      <img src={item.image} alt={item.name} className="guide-image" />
                      <div className="guide-name">{item.name}</div>
                      <div className="guide-specialty">{item.badge}</div>
                      <div className="star-rating justify-content-center mb-2">
                        <Ratingstar rating={item.rating} />
                        <span className="count">({item.rating})</span>
                      </div>
                      <div className="guide-langs">
                        <span className="lang-badge">{item.languages}</span>
                        \
                      </div>
                      <div className="guide-price"><span>${item.charges}</span>/day</div>
                      <Link to={`/guidedetail/${item.id}`} className="btn-accent" style={{ textAlign: 'center', border: 'none', display: 'inline-block' }}>Hire Guide</Link>
                    </div>
                  </div>
                );
              })
            }
          </div>
          <div className="section-view-all">
            <Link to="/guides" className="btn-primary-custom"><i className="bi bi-people me-2"></i>Meet All Guides</Link>
          </div>
        </div>
      </section>





      <section className="testimonials-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-badge">Testimonials</span>
            <h2 className="section-title">What Our <span className="text-accent">Travelers Say</span></h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">Real stories from real adventurers who traveled with us</p>
          </div>





          {/* Testimonial section  */}


          <div className="row g-4">

            {
              reviews.slice(0, 3).map((item) => {
                return (

                  <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration="1000" key={item.id}>
                    <div className="testimonial-card">
                      <div className="star-rating mb-3">
                        <Ratingstar rating={item.rating} />
                        <span className="count">({item.rating})</span>
                      </div>
                      <p className="testimonial-text">{item.comment}</p>
                      <div className="testimonial-author">
                        <img src={item.user_image} alt={item.user_name} className="testimonial-avatar" />
                        <div>
                          <div className="testimonial-name">{item.user_name}</div>
                          <div className="testimonial-origin">{item.user_address}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }

          </div>
        </div>
      </section>

      {isVideoOpen ? (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: 'rgba(0, 0, 0, 0.75)', zIndex: 2000, padding: '1rem' }}
          onClick={closeVideoPopup}
        >
          <div
            className="bg-dark rounded-4 p-3 position-relative w-100"
            style={{ maxWidth: '900px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="btn btn-light position-absolute"
              style={{ top: '12px', right: '12px', zIndex: 2 }}
              onClick={closeVideoPopup}
              aria-label="Close video"
            >
              <i className="bi bi-x-lg"></i>
            </button>
            <video src="video1.mp4" controls autoPlay className="w-100 rounded-3" />
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Homepage
