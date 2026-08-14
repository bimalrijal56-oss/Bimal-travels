import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Ratingstar from '../compoenents/Ratingstar'
import Swal from 'sweetalert2'
import { API_BASE_URL } from '../config';

const Tourdetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const bookingForm = useRef(null)

    const [travels, setTravels] = useState([])
    const [tourTravelers, setTourTravelers] = useState('2')
    const [transactionId, setTransactionId] = useState('')
    const [isPaymentDone, setIsPaymentDone] = useState(false)

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/api/travels?format=json`)
            .then((res) => setTravels(res.data))
            .catch((err) => console.log(err))
    }, [])

    const authUser = (() => {
        try {
            return JSON.parse(localStorage.getItem('authUser') || 'null')
        } catch {
            return null
        }
    })()

    const handlePayNow = async (e) => {
        e.preventDefault()

        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

        if (!isLoggedIn) {
            Swal.fire({
                icon: 'warning',
                title: 'Login required',
                text: 'Please log in before booking a tour.',
            })
            return
        }

        const result = await Swal.fire({
            title: "Pay your Fee!",
            text: "Please visit our office with necessary documents like your citizenship and booking confirmation to complete the payment process. Our team will assist you in finalizing your booking and ensuring a smooth travel experience.(Cash is also accepted)",
            imageUrl: "/bankqr.jpeg",
            imageWidth: 350,
            imageHeight: 350,
            imageAlt: "Pay at Esewa - 9867428466",
            confirmButtonText: 'OK',
        })

        if (!result.isConfirmed) {
            return
        }

        setIsPaymentDone(true)
    };

    const handleBookNow = async (e, item) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const tourDate = formData.get('tour_date')

        if (!isPaymentDone) {
            Swal.fire({
                icon: 'warning',
                title: 'Payment required',
                text: 'Please complete payment first.',
            })
            return
        }

        if (!transactionId.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Transaction ID required',
                text: 'Please enter your transaction ID before booking.',
            })
            return
        }

        if (!tourDate) {
            Swal.fire({
                icon: 'warning',
                title: 'Date required',
                text: 'Please select a date before booking.',
            })
            return
        }

        try {
            await axios.post(`${API_BASE_URL}/api/travel_booking/${item.id}`, {
                customer_name: authUser?.username || 'Guest',
                date: tourDate,
                total_people: Number(tourTravelers) || 1,
                transaction_id: transactionId.trim(),
            })
        } catch (error) {
            const message = error?.response?.data?.error || 'Booking failed. Please try again.'
            Swal.fire({
                icon: 'error',
                title: 'Booking failed',
                text: message,
            })
            return
        }

        Swal.fire({
            icon: 'success',
            title: 'Your tour package is booked successfully',
            text: 'Thank you for booking with us.',
        }).then(() => {
            navigate('/')
        })
    };

    return (

        <>
            {
                travels.filter((item) => String(item.id) === String(id)).map((item) => (

                    <div key={item.id}>

                        <section className="page-hero">
                            <div className="container page-hero-content">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                        <li className="breadcrumb-item"><Link to="/travels">Tours</Link></li>
                                        <li className="breadcrumb-item active">{item.title}</li>
                                    </ol>
                                </nav>
                                <h1 className="page-hero-title">{item.title}<span> Tour</span></h1>
                                <div className="d-flex flex-wrap align-items-center gap-3 mt-3">
                                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                                        <i className="bi bi-geo-alt-fill text-accent me-1"></i>{item.region}
                                    </span>
                                    <div className="star-rating">
                                        <Ratingstar rating={item.rating} />
                                        <span className="count" style={{ color: 'rgba(255,255,255,0.7)' }}>({item.rating})</span>
                                    </div>
                                    <span className="tour-card-badge" style={{ position: 'static' }}>{item.trending ? 'Trending' : 'Top-rated experience'}</span>
                                </div>
                            </div>
                        </section>

                        <section style={{ padding: '60px 0', background: 'var(--bg-light)' }}>
                            <div className="container">
                                <div className="row g-4">
                                    <div className="col-lg-8">
                                        <div id="tourCarousel" className="carousel slide mb-4 rounded-custom overflow-hidden shadow" data-bs-ride="carousel">
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <img src={item.image} className="d-block w-100" alt={item.title} style={{ height: '420px', objectFit: 'cover' }} />
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', padding: '28px' }}>
                                            <h3 style={{ color: 'var(--primary)', fontSize: '1.3rem', marginBottom: '18px' }}>Tour Details</h3>

                                            <div
                                                style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                                    gap: '14px',
                                                    marginBottom: '24px',
                                                }}
                                            >
                                                <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Country</div>
                                                    <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.country}</div>
                                                </div>
                                                <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Region</div>
                                                    <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.region}</div>
                                                </div>
                                                <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Difficulty</div>
                                                    <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.difficulty}</div>
                                                </div>
                                                <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Per Person Fee</div>
                                                    <div style={{ fontWeight: 600, color: 'var(--primary)' }}>${item.per_person_fee}</div>
                                                </div>
                                                <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Time of Completion</div>
                                                    <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.time_of_completion} Days</div>
                                                </div>
                                                <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Best Season</div>
                                                    <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.best_season}</div>
                                                </div>
                                            </div>

                                            <div style={{ marginBottom: '22px' }}>
                                                <h4 style={{ color: 'var(--primary)', fontSize: '1.05rem', marginBottom: '10px' }}>Details</h4>
                                                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 0 }}>
                                                    {item.details}
                                                </p>
                                            </div>

                                            <div>
                                                <h4 style={{ color: 'var(--primary)', fontSize: '1.05rem', marginBottom: '10px' }}>Day by Day Plan</h4>
                                                <div style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '16px' }}>
                                                    <div style={{ marginBottom: '10px' }}>

                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Description</div>
                                                        <div style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                                                            {item.day_by_day?.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div className="booking-card">
                                            <div className="booking-price-tag">
                                                <span className="booking-price-main">${item.per_person_fee}</span>
                                                <span className="booking-price-per"> /person</span>
                                            </div>
                                            <form className="booking-form" ref={bookingForm} onSubmit={(e) => handleBookNow(e, item)}>
                                                <input type="hidden" name="tour_title" value={item.title} />
                                                <input type="hidden" name="user_email" value={authUser?.email || ''} />
                                                <div className="form-group-custom mb-3">
                                                    <label className="form-label">Select Date</label>
                                                    <input type="date" className="form-control" name="tour_date" min={new Date().toISOString().split('T')[0]} required />
                                                </div>
                                                <div className="form-group-custom mb-3">
                                                    <label className="form-label">Number of People</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="tour_travelers"
                                                        min="1"
                                                        placeholder="Enter number of people"
                                                        value={tourTravelers}
                                                        onChange={(e) => setTourTravelers(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="booking-total-box mb-3" style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '14px 16px' }}>
                                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Total Amount</div>
                                                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary)' }}>
                                                        ${(Number(item.per_person_fee) || 0) * (Number(tourTravelers) || 0)}
                                                    </div>
                                                </div>
                                                <button type="button" onClick={handlePayNow} className="btn-accent w-100" style={{ border: 'none', padding: '14px', fontSize: '1rem' }}>
                                                    <i className="bi bi-credit-card me-2"></i>Pay Now
                                                </button>


                                                {isPaymentDone ? (
                                                    <>
                                                        <div className="form-group-custom my-3">
                                                            <label className="form-label">Transaction ID</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="transaction_id"
                                                                placeholder="Enter transaction ID"
                                                                value={transactionId}
                                                                onChange={(e) => setTransactionId(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                        <button type="submit" className="btn-accent w-100" style={{ border: 'none', padding: '14px', fontSize: '1rem' }}>
                                                            <i className="bi bi-calendar-check me-2"></i>Book Now
                                                        </button>
                                                    </>
                                                ) : null}
                                            </form>
                                            <div className="text-center mt-2" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                                <i className="bi bi-telephone text-accent me-1"></i>Need help? <Link to="/contacts" style={{ color: 'var(--accent)' }}>Call us</Link>
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

export default Tourdetails
