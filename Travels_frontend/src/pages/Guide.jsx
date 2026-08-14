import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Ratingstar from '../compoenents/Ratingstar'
import { API_BASE_URL } from '../config';

const Guide = () => {
    const [guides, setGuides] = useState([])

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/guides/?format=json`)
            .then(res => setGuides(res.data))
            .catch(err => console.log(err))
    }, [])


    const [search, setSearch] = useState("")
    const [activeCategory, setActiveCategory] = useState('')

    const handSearch = (e) => {
        setSearch(e.target.value)
        setActiveCategory('')
    }

    const handleCategoryClick = (category) => {
        setSearch(category)
        setActiveCategory(category)
    }

    const clearCategory = () => {
        setSearch('')
        setActiveCategory('')
    }

    const filteredGuides = guides.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase()) || item.bio.toLowerCase().includes(search.toLowerCase())
    })
    return (
        <>
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

            <section style={{ padding: '70px 0', background: 'var(--bg-light)' }}>
                <div className="container">
                    <div className="d-flex flex-wrap gap-2 mb-5 justify-content-center">
                        <button className={activeCategory === '' ? 'btn-accent' : 'btn-accent-outline'} style={{ border: activeCategory === '' ? 'none' : undefined, padding: '8px 20px', fontSize: '0.85rem' }} onClick={clearCategory}>All Guides</button>
                        <button className={activeCategory === 'Trekking' ? 'btn-accent' : 'btn-accent-outline'} style={{ padding: '8px 20px', fontSize: '0.85rem' }} onClick={() => handleCategoryClick('Trekking')}>Trekking</button>
                        <button className={activeCategory === 'Cultural' ? 'btn-accent' : 'btn-accent-outline'} style={{ padding: '8px 20px', fontSize: '0.85rem' }} onClick={() => handleCategoryClick('Cultural')}>Cultural</button>
                        <button className={activeCategory === 'Wildlife' ? 'btn-accent' : 'btn-accent-outline'} style={{ padding: '8px 20px', fontSize: '0.85rem' }} onClick={() => handleCategoryClick('Wildlife')}>Wildlife</button>
                        <button className={activeCategory === 'Adventure' ? 'btn-accent' : 'btn-accent-outline'} style={{ padding: '8px 20px', fontSize: '0.85rem' }} onClick={() => handleCategoryClick('Adventure')}>Adventure</button>
                        <button className={activeCategory === 'Luxury' ? 'btn-accent' : 'btn-accent-outline'} style={{ padding: '8px 20px', fontSize: '0.85rem' }} onClick={() => handleCategoryClick('Luxury')}>Luxury</button>
                    </div>

                    <div className="row g-4">
                        {
                            filteredGuides.slice(0, 6).map((item) => (

                                <div className="col-lg-3 col-md-6 " key={item.id}>
                                    <div className="guide-card">
                                        <img src={item.image} alt={item.name} className="guide-avatar" />
                                        <div className="guide-name">{item.name}</div>
                                        <div className="guide-specialty">{item.specialty}</div>
                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px' }}>{item.experience}</div>
                                        <div className="star-rating justify-content-center mb-2">
                                            <Ratingstar rating={item.rating} />
                                            <span className="count">({item.rating})</span>
                                        </div>
                                        <div className="guide-langs">

                                            <span className="lang-badge">{item.languages}</span>

                                        </div>
                                        <div className="guide-price">
                                            <span>${item.charges}</span>/day
                                        </div>
                                        <Link to={`/ guidedetail / ${ item.id }`} className="btn-accent" style={{ width: '90%', textAlign: 'center', border: 'none', display: 'inline-block', margin: '0 auto' }}>
                                            Hire Guide
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>

            <section style={{ padding: '70px 0', background: 'var(--primary)', position: 'relative', overflow: 'hidden' }}>
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: "url('/guide-bg.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.08,
                    }}
                ></div>
                <div className="container text-center" style={{ position: 'relative', zIndex: 2 }}>
                    <span className="section-badge" style={{ background: 'rgba(247,147,30,0.2)', color: 'var(--accent-light)' }}>Join Us</span>
                    <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>Are You an Experienced Guide?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '560px', margin: '0 auto 28px', fontSize: '1rem' }}>
                        Join our team of expert guides and help travelers experience the best of Nepal and beyond. Competitive pay, flexible schedule.
                    </p>
                    <Link to="/contacts" className="btn-accent">
                        <i className="bi bi-person-plus me-2"></i>Apply to Become a Guide
                    </Link>
                </div>
            </section>
        </>
    )
}

export default Guide
