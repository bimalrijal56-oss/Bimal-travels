import React from 'react'
import { Link } from 'react-router-dom'
import logo from '/Bimaltravels-logo.png'

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4 col-md-6">
              <div className="footer-brand">
                <img src={logo} alt="Bimal Travels" />
                <div className="footer-brand-name">BIMAL <span>TRAVELS</span></div>
              </div>
              <p className="footer-desc">Your trusted partner for unforgettable travel experiences across Nepal and the world. We craft journeys that inspire and memories that last a lifetime.</p>
              <div className="social-icons">
                <Link to={"https://www.facebook.com/bimal.rijal.752"} className="social-icon" aria-label="Facebook"><i className="bi bi-facebook"></i></Link>
                <Link to={"https://www.instagram.com/bimalrijal_17/"} className="social-icon" aria-label="Instagram"><i className="bi bi-instagram"></i></Link>
                <Link to={"#"} className="social-icon" aria-label="Twitter"><i className="bi bi-twitter"></i></Link>
                <Link to={"#"} className="social-icon" aria-label="YouTube"><i className="bi bi-youtube"></i></Link>
                <Link to={"#"} className="social-icon" aria-label="TikTok"><i className="bi bi-tiktok"></i></Link>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <h5 className="footer-heading">Quick Links</h5>
              <ul className="footer-links">
                <li><Link to={"/"}><i className="bi bi-chevron-right"></i>Home</Link></li>
                <li><Link to={"/travels"}><i className="bi bi-chevron-right"></i>Tours</Link></li>
                <li><Link to={"/mybookings"}><i className="bi bi-chevron-right"></i>My Bookings</Link></li>
                <li><Link to={"/guides"}><i className="bi bi-chevron-right"></i>Our Guides</Link></li>
                <li><Link to={"/contacts"}><i className="bi bi-chevron-right"></i>Contact Us</Link></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6">
              <h5 className="footer-heading">Tour Types</h5>
              <ul className="footer-links">
                <li><Link to={"/travels"}><i className="bi bi-chevron-right"></i>Trekking</Link></li>
                <li><Link to={"/travels"}><i className="bi bi-chevron-right"></i>Beach Tours</Link></li>
                <li><Link to={"/travels"}><i className="bi bi-chevron-right"></i>Cultural Tours</Link></li>
                <li><Link to={"/travels"}><i className="bi bi-chevron-right"></i>Adventure</Link></li>
                <li><Link to={"/travels"}><i className="bi bi-chevron-right"></i>Luxury Travel</Link></li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6">
              <h5 className="footer-heading">Contact Info</h5>
              <div className="footer-contact-item">
                <div className="footer-contact-icon"><i className="bi bi-geo-alt-fill"></i></div>
                <div className="footer-contact-text">Thamel, Kathmandu, Nepal<br />GPO Box 4321</div>
              </div>
              <div className="footer-contact-item">
                <div className="footer-contact-icon"><i className="bi bi-telephone-fill"></i></div>
                <div className="footer-contact-text">+977-1-4701234<br />+977-9867428466</div>
              </div>
              <div className="footer-contact-item">
                <div className="footer-contact-icon"><i className="bi bi-envelope-fill"></i></div>
                <div className="footer-contact-text">info@bimaltravels.com<br />booking@bimaltravels.com</div>
              </div>
              <div className="footer-contact-item">
                <div className="footer-contact-icon"><i className="bi bi-clock-fill"></i></div>
                <div className="footer-contact-text">Mon – Sat: 9:00 AM – 6:00 PM<br />Sunday: 10:00 AM – 4:00 PM</div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <p>&copy; 2025 <Link to="/">Bimal Travels</Link>. All rights reserved. | Designed with <i className="bi bi-heart-fill text-accent"></i> for adventurers</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
