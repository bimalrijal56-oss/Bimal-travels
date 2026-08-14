import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Ratingstar from '../compoenents/Ratingstar'
import { API_BASE_URL } from '../config';

const Bookingdetails = () => {
    const { id } = useParams()
    const [booking, setBooking] = useState([])

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const authUser = (() => {
        try {
            return JSON.parse(localStorage.getItem('authUser') || 'null')
        } catch {
            return null
        }
    })()

    const formatBookedAt = (value) => {
        const text = String(value || '')
        const [datePart, timePart] = text.split('T')
        if (!datePart || !timePart) {
            return value
        }
        const cleanTime = timePart.split('.')[0].split('+')[0].split('-')[0]
        return `${datePart} ${cleanTime}`
    }

    useEffect(() => {
        if (!isLoggedIn || !authUser?.username) {
            setBooking([])
            return
        }

        axios.get(`${API_BASE_URL}/api/bookings/?format=json`)
            .then((res) => {
                const userBookings = (res.data || []).filter((item) => item.customer_name === authUser.username)
                setBooking(userBookings)
            })
            .catch((err) => console.log(err))
    }, [isLoggedIn, authUser?.username])

    return (
        <>
            {
                booking.filter((item) => String(item.id) === String(id)).map((item) => (
                    <div key={item.id}>

                        <section className="page-hero">
                            <div className="container page-hero-content">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link to="/mybookings">My Bookings</Link>
                                        </li>
                                        <li className="breadcrumb-item active">Booking Details</li>
                                    </ol>
                                </nav>
                                <h1 className="page-hero-title">
                                    Booking <span>Details</span>
                                </h1>
                                <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '550px', fontSize: '1rem' }}>
                                    Review your booking information and tour package details.
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
                                                    <img src={item.travel_details?.image} className="d-block w-100" alt={item.travel_details?.title} style={{ height: '420px', objectFit: 'cover' }} />
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', padding: '28px' }}>
                                            <h3 style={{ color: 'var(--primary)', fontSize: '1.3rem', marginBottom: '18px' }}>Booking Summary</h3>

                                            <div
                                                style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                                    gap: '14px',
                                                    marginBottom: '24px',
                                                }}
                                            >
                                                <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Booking ID</div>
                                                    <div style={{ fontWeight: 600, color: 'var(--primary)' }}>#{item.id}</div>
                                                </div>
                                                <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Customer</div>
                                                    <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.customer_name}</div>
                                                </div>
                                                <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Customer ID</div>
                                                    <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.customer}</div>
                                                </div>
                                                <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Travel ID</div>
                                                    <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.travel}</div>
                                                </div>
                                                <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Travel Date</div>
                                                    <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.date}</div>
                                                </div>
                                                <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Total People</div>
                                                    <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.total_people}</div>
                                                </div>
                                                <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Total Amount</div>
                                                    <div style={{ fontWeight: 600, color: 'var(--primary)' }}>${item.total_amount}</div>
                                                </div>
                                                <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Status</div>
                                                    <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.status}</div>
                                                </div>
                                                <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Payment Status</div>
                                                    <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.payment_status}</div>
                                                </div>
                                                <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Transaction ID</div>
                                                    <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.transaction_id}</div>
                                                </div>
                                                <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Booked At</div>
                                                    <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{formatBookedAt(item.booked_at)}</div>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 style={{ color: 'var(--primary)', fontSize: '1.05rem', marginBottom: '10px' }}>Tour Details</h4>
                                                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 0 }}>
                                                    {item.travel_details?.details}
                                                </p>
                                            </div>

                                            <div style={{ marginTop: '20px' }}>
                                                <h4 style={{ color: 'var(--primary)', fontSize: '1.05rem', marginBottom: '10px' }}>Travel Information</h4>
                                                <div
                                                    style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                                        gap: '14px',
                                                        marginBottom: '18px',
                                                    }}
                                                >
                                                    <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Title</div>
                                                        <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.travel_details?.title}</div>
                                                    </div>
                                                    <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Country</div>
                                                        <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.travel_details?.country}</div>
                                                    </div>
                                                    <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Region</div>
                                                        <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.travel_details?.region}</div>
                                                    </div>
                                                    <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Trending</div>
                                                        <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.travel_details?.trending ? 'Yes' : 'No'}</div>
                                                    </div>
                                                    <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Difficulty</div>
                                                        <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.travel_details?.difficulty}</div>
                                                    </div>
                                                    <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Max People</div>
                                                        <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.travel_details?.max_people}</div>
                                                    </div>
                                                    <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Per Person Fee</div>
                                                        <div style={{ fontWeight: 600, color: 'var(--primary)' }}>${item.travel_details?.per_person_fee}</div>
                                                    </div>
                                                    <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Time of Completion</div>
                                                        <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.travel_details?.time_of_completion} Days</div>
                                                    </div>
                                                    <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Best Season</div>
                                                        <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.travel_details?.best_season}</div>
                                                    </div>
                                                    <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Best Guide ID</div>
                                                        <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.travel_details?.best_guide}</div>
                                                    </div>
                                                    <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Best Guide Name</div>
                                                        <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.travel_details?.best_guide_name || 'N/A'}</div>
                                                    </div>
                                                    <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Rating</div>
                                                        <div style={{ fontWeight: 600, color: 'var(--primary)' }}><Ratingstar rating={item.travel_details?.rating} />({item.travel_details?.rating})</div>
                                                    </div>
                                                </div>

                                                <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '16px' }}>
                                                    <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Day by Day Plan</div>
                                                    <div style={{ fontSize: '0.95rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '6px' }}>
                                                        {item.travel_details?.day_by_day?.name}
                                                    </div>
                                                    <div style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                                                        {item.travel_details?.day_by_day?.description}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 d-flex justify-content-end">
                                                <Link to="/mybookings" className="btn-accent" style={{ border: 'none' }}>
                                                    <i className="bi bi-arrow-left me-2"></i>Back to My Bookings
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                ))
            }
        </>
    )
}

export default Bookingdetails
