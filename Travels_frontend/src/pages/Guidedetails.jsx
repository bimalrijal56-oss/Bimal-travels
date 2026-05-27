import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Ratingstar from '../compoenents/Ratingstar'

const Guidedetails = () => {
    const { id } = useParams()
    const [guides, setGuides] = useState([])

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/guides/?format=json')
            .then((res) => setGuides(res.data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            {guides.filter((item) => String(item.id) === String(id)).map((item) => (
                <div key={item.id}>
                    <section className="page-hero">
                        <div className="container page-hero-content">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Our Guides</li>
                                </ol>
                            </nav>
                            <h1 className="page-hero-title">
                                Meet Our Expert <span>Guides</span>
                            </h1>
                            <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '550px', fontSize: '1rem' }}>
                                Our certified and experienced guides are passionate about sharing Nepal&apos;s beauty and culture with you.
                            </p>
                        </div>
                    </section>

                    <section style={{ padding: '60px 0', background: 'var(--bg-light)' }}>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    <div id="guideCarousel" className="carousel slide mb-4 rounded-custom overflow-hidden shadow" data-bs-ride="carousel">
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img src={item.image} className="d-block w-100" alt={item.name} style={{ height: '420px', objectFit: 'cover' }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', padding: '28px' }}>
                                        <h3 style={{ color: 'var(--primary)', fontSize: '1.3rem', marginBottom: '18px' }}>Guide Details</h3>

                                        <div
                                            style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                                gap: '14px',
                                                marginBottom: '24px',
                                            }}
                                        >
                                            <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Name</div>
                                                <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.name}</div>
                                            </div>
                                            <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Languages</div>
                                                <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.languages}</div>
                                            </div>
                                            <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Phone</div>
                                                <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.phone}</div>
                                            </div>
                                            <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Experience</div>
                                                <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.experience_years} Years</div>
                                            </div>
                                            <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Charges</div>
                                                <div style={{ fontWeight: 600, color: 'var(--primary)' }}>${item.charges} /day</div>
                                            </div>
                                            <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Rating</div>
                                                <div style={{ fontWeight: 600, color: 'var(--primary)' }}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.rating} <Ratingstar rating={item.rating} /></div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 style={{ color: 'var(--primary)', fontSize: '1.05rem', marginBottom: '10px' }}>Bio</h4>
                                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 0 }}>
                                                {item.bio}
                                            </p>
                                            <h4 style={{ color: 'var(--primary)', fontSize: '1rem', marginTop: '18px', marginBottom: '10px' }}>Social Media</h4>
                                            <div className="social-icons">
                                                <a href={item.fb_link || '#'} target="_blank" className="social-icon" aria-label="Facebook" style={{ color: '#6b7280', background: '#f3f4f6', borderColor: '#d1d5db' }}><i className="bi bi-facebook"></i></a>
                                                <a href={item.insta_link || '#'} target="_blank" className="social-icon" aria-label="Instagram" style={{ color: '#6b7280', background: '#f3f4f6', borderColor: '#d1d5db' }}><i className="bi bi-instagram"></i></a>
                                                <a href={item.twitter_link || '#'} target="_blank" className="social-icon" aria-label="Twitter" style={{ color: '#6b7280', background: '#f3f4f6', borderColor: '#d1d5db' }}><i className="bi bi-twitter"></i></a>
                                                <a href={item.youtube_link || '#'} target="_blank" className="social-icon" aria-label="YouTube" style={{ color: '#6b7280', background: '#f3f4f6', borderColor: '#d1d5db' }}><i className="bi bi-youtube"></i></a>
                                                <a href={item.tiktok_link || '#'} target="_blank" className="social-icon" aria-label="TikTok" style={{ color: '#6b7280', background: '#f3f4f6', borderColor: '#d1d5db' }}><i className="bi bi-tiktok"></i></a>
                                            </div>
                                        </div>

                                        <div className="mt-4 d-flex justify-content-end">
                                            <Link to="/" className="btn-accent" style={{ border: 'none' }}>
                                                <i className="bi bi-arrow-left me-2"></i>Return to Homepage
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            ))}
        </>
    )
}

export default Guidedetails
