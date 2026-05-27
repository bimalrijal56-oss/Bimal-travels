import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaMountainCity, FaEarthAsia, FaUmbrellaBeach, FaMountain } from 'react-icons/fa6'

const MyBooking = () => {
    const [bookings, setBookings] = useState([])
    const [search, setSearch] = useState('')
    const [activeRegion, setActiveRegion] = useState('')

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const authUser = (() => {
        try {
            return JSON.parse(localStorage.getItem('authUser') || 'null')
        } catch {
            return null
        }
    })()

    useEffect(() => {
        if (!isLoggedIn || !authUser?.username) {
            setBookings([])
            return
        }

        axios.get('http://127.0.0.1:8000/api/bookings/?format=json')
            .then(res => {
                const userBookings = (res.data || []).filter((item) => item.customer_name === authUser.username)
                setBookings(userBookings)
            })
            .catch(err => console.log(err))
    }, [isLoggedIn, authUser?.username])

    const handleSearch = (e) => {
        setSearch(e.target.value)
        setActiveRegion('')
    }

    const handleRegionClick = (region) => {
        setSearch(region)
        setActiveRegion(region)
    }

    const clearRegion = () => {
        setSearch('')
        setActiveRegion('')
    }



    const filteredBookings = bookings.filter((item) => {
        return item.travel_details?.title?.toLowerCase().includes(search.toLowerCase()) || item.travel_details?.region?.toLowerCase().includes(search.toLowerCase())
    })
    return (
        <>
            {/* PAGE HERO */}
            <section className="page-hero">
                <div className="container page-hero-content">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active">My Bookings</li>
                        </ol>
                    </nav>
                    <h1 className="page-hero-title">My <span>Bookings</span></h1>
                    <p
                        style={{
                            color: 'rgba(255,255,255,0.75)',
                            maxWidth: '550px',
                            fontSize: '1rem'
                        }}
                    >
                        From the roof of the world to tropical paradises - discover your next dream destination.
                    </p>
                </div>
            </section>

            {/* MY BOOKINGS */}
            <section style={{ padding: '70px 0', background: 'var(--bg-light)' }}>
                <div className="container">
                    {!isLoggedIn ? (
                        <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                            You haven&apos;t booked a tour yet.
                        </div>
                    ) : (
                        <>
                            <div className="mb-4" style={{ maxWidth: '420px', margin: '0 auto' }}>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={search}
                                    onChange={handleSearch}
                                    placeholder="Search by destination or region"
                                />
                            </div>

                            {/* Region Filter */}
                            <div className="d-flex flex-wrap gap-2 mb-5 justify-content-center">
                                <button className={activeRegion === '' ? 'btn-accent' : 'btn-accent-outline'} style={{ border: activeRegion === '' ? 'none' : undefined, padding: '8px 22px', fontSize: '0.85rem' }} onClick={clearRegion}>
                                    All Regions
                                </button>
                                <button className={activeRegion === 'Nepal' ? 'btn-accent' : 'btn-accent-outline'} style={{ padding: '8px 22px', fontSize: '0.85rem' }} onClick={() => handleRegionClick('Nepal')}>
                                    <FaMountainCity style={{ marginRight: '8px' }} />
                                    Nepal
                                </button>
                                <button className={activeRegion === 'South Asia' ? 'btn-accent' : 'btn-accent-outline'} style={{ padding: '8px 22px', fontSize: '0.85rem' }} onClick={() => handleRegionClick('South Asia')}>
                                    <FaEarthAsia style={{ marginRight: '8px' }} />
                                    South Asia
                                </button>
                                <button className={activeRegion === 'Southeast Asia' ? 'btn-accent' : 'btn-accent-outline'} style={{ padding: '8px 22px', fontSize: '0.85rem' }} onClick={() => handleRegionClick('Southeast Asia')}>
                                    <FaEarthAsia style={{ marginRight: '8px' }} />
                                    Southeast Asia
                                </button>
                                <button className={activeRegion === 'Island Escapes' ? 'btn-accent' : 'btn-accent-outline'} style={{ padding: '8px 22px', fontSize: '0.85rem' }} onClick={() => handleRegionClick('Island Escapes')}>
                                    <FaUmbrellaBeach style={{ marginRight: '8px' }} />
                                    Island Escapes
                                </button>
                            </div>


                            <div className="mb-5">
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <span style={{ fontSize: '1.5rem', color: 'var(--accent)' }}><FaMountain /></span>
                                    <h3 style={{ color: 'var(--primary)', fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>My Bookings</h3>
                                    <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg,var(--accent),transparent)' }}></div>
                                </div>
                            </div>

                            {/* listing of countries and bookings */}
                            <div className="row g-4 ">
                                {

                                    filteredBookings.map((item) => (
                                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration="1000" key={item.id}>
                                            <Link to={`/bookingdetail/${item.id}`} style={{ textDecoration: 'none' }}>
                                                <div className="dest-card">
                                                    <img src={item.travel_details?.image} alt={item.travel_details?.title} />
                                                    <div className="dest-card-overlay">
                                                        <div className="dest-card-name">{item.travel_details?.title}</div>
                                                        <div className="dest-card-count">Booked on {item.date} - <span>{item.travel_details?.difficulty?.toUpperCase()}</span> Tour</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>

                                    ))
                                }
                            </div>

                        </>
                    )}

                </div>
            </section>
        </>
    )
}

export default MyBooking
