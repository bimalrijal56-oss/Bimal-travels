import React, { useRef } from 'react'
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../config';


const Contacts = () => {
    const form = useRef(null)

    const sendEmail = (e) => {
        e.preventDefault()

        emailjs
            .sendForm('service_eg0crjn', 'template_aaw1avd', form.current, {
                publicKey: 'o-GMwO0JNyc7pA5Pp',
            })
            .then(
                () => {
                    toast.success('Thank you for reaching out! We will get back to you within 24-48 hours.')
                    e.target.reset()
                },
                (error) => {
                    console.log('FAILED...', error.text)
                    toast.error('Message could not be sent. Please try again.')
                },
            )
    }

    return (
        <div>
            <section className="page-hero" style={{ backgroundImage: "url('tajmahal.webp')" }}>
                <div className="page-hero-overlay"></div>
                <div className="container text-center text-white position-relative z-1">
                    <nav aria-label="breadcrumb" className="mb-3">
                        <ol className="breadcrumb justify-content-center">
                            <li className="breadcrumb-item"><Link to="/" className="text-white-50">Home</Link></li>
                            <li className="breadcrumb-item active text-white">Contact</li>
                        </ol>
                    </nav>
                    <h1 className="display-4 fw-bold">Get In Touch</h1>
                    <p className="lead text-white-75">We're here to help plan your perfect journey</p>
                </div>
            </section>

            {/* <!-- CONTACT INFO CARDS --> */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="contact-info-card text-center fade-in">
                                <div className="contact-icon-wrap mb-3">
                                    <i className="bi bi-geo-alt-fill"></i>
                                </div>
                                <h5 className="fw-bold text-primary-dark">Visit Our Office</h5>
                                <p className="text-muted mb-0">Thamel, Kathmandu<br />Bagmati Province, Nepal 44600</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="contact-info-card text-center fade-in">
                                <div className="contact-icon-wrap mb-3">
                                    <i className="bi bi-telephone-fill"></i>
                                </div>
                                <h5 className="fw-bold text-primary-dark">Call Us Anytime</h5>
                                <p className="text-muted mb-1">+977 1 4700000</p>
                                <p className="text-muted mb-0">+977 9800000000</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="contact-info-card text-center fade-in">
                                <div className="contact-icon-wrap mb-3">
                                    <i className="bi bi-envelope-fill"></i>
                                </div>
                                <h5 className="fw-bold text-primary-dark">Email Us</h5>
                                <p className="text-muted mb-1">info@bimaltravels.com</p>
                                <p className="text-muted mb-0">support@bimaltravels.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- CONTACT FORM + MAP --> */}
            <section className="py-5">
                <div className="container">
                    <div className="row g-5 align-items-start">

                        {/* <!-- Form --> */}
                        <div className="col-lg-6 ">
                            <div className="section-label mb-2">REACH OUT</div>
                            <h2 className="section-title mb-4">Send Us a Message</h2>
                            <form ref={form} id="contactForm" className="contact-form" onSubmit={sendEmail}>
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <label className="form-label">First Name <span className="text-orange">*</span></label>
                                        <input type="text" name="first_name" className="form-control custom-input" placeholder="John" required />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Last Name <span className="text-orange">*</span></label>
                                        <input type="text" name="last_name" className="form-control custom-input" placeholder="Doe" required />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Email Address <span className="text-orange">*</span></label>
                                        <input type="email" name="user_email" className="form-control custom-input" placeholder="john@example.com" required />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Phone Number</label>
                                        <input type="tel" name="phone_number" className="form-control custom-input" placeholder="+977 98XXXXXXXX" />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Subject <span className="text-orange">*</span></label>
                                        <select name="subject" className="form-select custom-input" defaultValue="" required>
                                            <option value="" disabled>Select a subject</option>
                                            <option>Tour Inquiry</option>
                                            <option>Booking Assistance</option>
                                            <option>Guide Request</option>
                                            <option>Group Travel</option>
                                            <option>Custom Package</option>
                                            <option>Complaint / Feedback</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Your Message <span className="text-orange">*</span></label>
                                        <textarea name="message" className="form-control custom-input" rows="5" placeholder="Tell us how we can help you..." required></textarea>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-orange w-100 py-3">
                                            <i className="bi bi-send me-2"></i>Send Message
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* <!-- Map + Hours --> */}
                        <div className="col-lg-6 fade-in">
                            <div className="section-label mb-2">FIND US</div>
                            <h2 className="section-title mb-4">Our Location</h2>
                            {/* <!-- Map placeholder --> */}
                            <div className="map-placeholder mb-4">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.9898897027177!2d85.30826437561743!3d27.71502572484704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1855e6a34885%3A0x4d91c6d0395e9e5b!2sThamel%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1710000000000!5m2!1sen!2snp"
                                    width="100%" height="320" style={{ border: 0, borderRadius: '16px' }} allowFullScreen loading="lazy">
                                </iframe>
                            </div>

                            {/* <!-- Business Hours --> */}
                            <div className="hours-card">
                                <h5 className="fw-bold text-primary-dark mb-3"><i className="bi bi-clock me-2 text-orange"></i>Business Hours</h5>
                                <div className="hours-list">
                                    <div className="hours-row d-flex justify-content-between py-2 border-bottom">
                                        <span className="text-muted">Sunday – Friday</span>
                                        <span className="fw-semibold">9:00 AM – 6:00 PM</span>
                                    </div>
                                    <div className="hours-row d-flex justify-content-between py-2 border-bottom">
                                        <span className="text-muted">Saturday</span>
                                        <span className="fw-semibold">10:00 AM – 4:00 PM</span>
                                    </div>
                                    <div className="hours-row d-flex justify-content-between py-2">
                                        <span className="text-muted">Public Holidays</span>
                                        <span className="text-orange fw-semibold">Closed</span>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Social Links --> */}
                            <div className="mt-4">
                                <h5 className="fw-bold text-primary-dark mb-3">Follow Us</h5>
                                <div className="d-flex gap-3">
                                    <Link to={"https://www.facebook.com/bimal.rijal.752"} className="social-circle"><i className="bi bi-facebook"></i></Link>
                                    <Link to={"https://www.instagram.com/bimalrijal_17/"} className="social-circle"><i className="bi bi-instagram"></i></Link>
                                    <Link to={"#"} className="social-circle"><i className="bi bi-twitter-x"></i></Link>
                                    <Link to={"#"} className="social-circle"><i className="bi bi-youtube"></i></Link>
                                    <Link to={"#"} className="social-circle"><i className="bi bi-whatsapp"></i></Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contacts
