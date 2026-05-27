import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '/Bimaltravels-logo.png'
import Counter from '../compoenents/Counter'
import axios from 'axios'
import Ratingstar from '../compoenents/Ratingstar'
import Swal from 'sweetalert2'

const Login = () => {
    const navigate = useNavigate()

    const [reviews, setReviews] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/reviews/?format=json')
            .then((res) => setReviews(res.data))
            .catch((err) => console.log(err))
    }, [])

    const featuredReview = reviews.find((item) => item.rating >= 4) || reviews[0] || null

    const showAlert = () => {
        Swal.fire({
            title: 'OOPs!',
            text: 'This feature is currently unavailable we will come soon with this feature. Sorry for the inconvenience.',
            imageUrl: '/oops.png',
            imageWidth: 450,
            imageHeight: 300,
            imageAlt: 'Sorry!!',
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!username.trim() || !password.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Missing fields',
                text: 'Please enter both username and password.',
            })
            return
        }

        setIsSubmitting(true)
        try {
            const response = await axios.post('http://127.0.0.1:8000/login', {
                username: username.trim(),
                password,
            })

            localStorage.setItem('isLoggedIn', 'true')
            localStorage.setItem('authToken', response.data.token)
            localStorage.setItem(
                'authUser',
                JSON.stringify({
                    username: response.data.username,
                    email: response.data.email,
                }),
            )
            window.dispatchEvent(new Event('auth-changed'))

            Swal.fire({
                icon: 'success',
                title: 'Login successful',
                text: 'You are now signed in.',
                timer: 1600,
                showConfirmButton: false,
            })

            setUsername('')
            setPassword('')
            navigate('/')
        } catch (error) {
            const message = error?.response?.data?.error || 'Something went wrong ❌'
            Swal.fire({
                icon: 'error',
                title: 'Login failed',
                text: message,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="auth-layout">
            <div
                className="auth-left d-none d-lg-flex"
                style={{
                    backgroundImage: "url('/login-bg.jpg')",
                }}
            >
                <div className="auth-left-overlay"></div>
                <div className="auth-left-content">
                    <Link to="/" className="d-flex align-items-center gap-2 mb-5 text-decoration-none">
                        <img src={logo} alt="Logo" height="52" className="rounded" />
                        <span className="brand-text text-white fs-4">BIMAL TRAVELS</span>
                    </Link>
                    <h2 className="display-5 fw-bold text-white mb-3">Your Adventure<br />Awaits You</h2>
                    <p className="text-white-75 mb-4 fs-5">Sign in and continue where you left off. Discover, book, and explore amazing destinations around the world.</p>
                    {featuredReview ? (
                        <div className="auth-testimonial">
                            <div className="d-flex align-items-center gap-3 mb-2">
                                <img src={featuredReview.user_image} alt="User" className="rounded-circle" width="48" height="48" style={{ objectFit: 'cover' }} />
                                <div>
                                    <div className="text-white fw-semibold">{featuredReview.user_name}</div>
                                    <div className="text-white-50 small">{featuredReview.user_address}</div>
                                </div>
                            </div>
                            <p className="text-white-75 fst-italic mb-0">{featuredReview.comment}</p>
                            <div className="text-orange mt-2"><Ratingstar rating={featuredReview.rating} /></div>
                        </div>
                    ) : null}
                    <div className="auth-stats d-flex gap-4 mt-4">
                        <div className="text-center">
                            <div className="text-orange fw-bold fs-4"><Counter end={500} /></div>
                            <div className="text-white-50 small">Tours</div>
                        </div>
                        <div className="text-center">
                            <div className="text-orange fw-bold fs-4"><Counter end={10000} /></div>
                            <div className="text-white-50 small">Happy Clients</div>
                        </div>
                        <div className="text-center">
                            <div className="text-orange fw-bold fs-4"><Counter end={50} /></div>
                            <div className="text-white-50 small">Destinations</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="auth-right d-flex align-items-center justify-content-center">
                <div className="auth-card w-100" style={{ maxWidth: '420px' }}>
                    <div className="d-lg-none text-center mb-4">
                        <Link to="/">
                            <img src={logo} alt="Logo" height="56" className="rounded" />
                        </Link>
                        <div className="brand-text mt-2">BIMAL TRAVELS</div>
                    </div>

                    <h2 className="fw-bold text-primary-dark mb-1">Welcome Back!</h2>
                    <p className="text-muted mb-4">Sign in to access your account and trips</p>

                    <div className="d-flex gap-3 mb-4">
                        <button type="button" className="btn btn-outline-secondary w-50 d-flex align-items-center justify-content-center gap-2" onClick={showAlert}>
                            <img src="/google-color.svg" width="18" alt="Google" />
                            <span className="small">Google</span>
                        </button>
                        <button type="button" className="btn btn-outline-secondary w-50 d-flex align-items-center justify-content-center gap-2" onClick={showAlert}>
                            <i className="bi bi-facebook text-primary"></i>
                            <span className="small">Facebook</span>
                        </button>
                    </div>

                    <div className="auth-divider mb-4"><span>or sign in with email</span></div>

                    <form id="loginForm" noValidate onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <div className="input-group-custom">
                                <i className="bi bi-person input-icon"></i>
                                <input
                                    type="text"
                                    className="form-control custom-input ps-5"
                                    placeholder="john_doe"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <label className="form-label mb-0">Password</label>
                                <a href="#" className="text-orange small text-decoration-none">Forgot Password?</a>
                            </div>
                            <div className="input-group-custom">
                                <i className="bi bi-lock input-icon"></i>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control custom-input ps-5 pe-5"
                                    id="loginPassword"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn-password-toggle"
                                    id="toggleLoginPassword"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} id="loginEyeIcon"></i>
                                </button>
                            </div>
                        </div>
                        <div className="mb-4 d-flex align-items-center gap-2">

                        </div>
                        <button type="submit" className="btn btn-orange w-100 py-3 fw-semibold" disabled={isSubmitting}>
                            <i className="bi bi-box-arrow-in-right me-2"></i>Sign In
                        </button>
                    </form>

                    <p className="text-center text-muted mt-4 mb-0">
                        Don't have an account? <Link to="/register" className="text-orange fw-semibold text-decoration-none">Create one</Link>
                    </p>

                    <div className="text-center mt-3">
                        <Link to="/" className="text-muted small text-decoration-none">
                            <i className="bi bi-arrow-left me-1"></i>Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
