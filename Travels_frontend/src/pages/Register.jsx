import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '/Bimaltravels-logo.png'
import Counter from '../compoenents/Counter'
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import axios from 'axios'
import { API_BASE_URL } from '../config';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const showAlert = () => {
        Swal.fire({
            title: "OOPs!",
            text: "This feature is currently unavailable we will come soon with this feature.Sorry for the inconvenience.",
            imageUrl: "/oops.png",
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: "Sorry!!"
        })
    }

    const navigate = useNavigate()

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            await axios.post(`${API_BASE_URL}/sign-up`, {
                username: values.uname,
                email: values.email,
                password: values.pwd,
            })

            Swal.fire({
                icon: 'success',
                title: 'Account created',
                text: 'Your account is ready. Please log in.',
                timer: 1700,
                showConfirmButton: false,
            })

            resetForm()
            navigate('/login')
        } catch (error) {
            const message = error?.response?.data?.error || 'Something went wrong ❌'
            Swal.fire({
                icon: 'error',
                title: 'Registration failed',
                text: message,
            })
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <Formik
            initialValues={{ uname: '', email: '', pwd: '', cpwd: '' }}
            validationSchema={Yup.object({
                uname: Yup.string()
                    .required('username is required')
                    .min(3, 'username must be 3 character long')
                    .matches(/^[a-zA-Z0-9_.]+$/, 'username is invalid'),
                email: Yup.string()
                    .required('email is required')
                    .email('invalid email'),
                pwd: Yup.string()
                    .required('password is required')
                    .min(8, 'password must be 8 characters long')
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$*!?]).{8,}$/, 'invalid password'),
                cpwd: Yup.string()
                    .required('confirm password is required')
                    .oneOf([Yup.ref('pwd')], 'password did not match')
            })}
            onSubmit={handleSubmit}
        >
            {() => (
                <>
                    {/* LEFT PANEL */}
                    <div
                        className="auth-left d-none d-lg-flex"
                        style={{
                            backgroundImage:
                                "url('/register-bg.jpg')",
                        }}
                    >
                        <div className="auth-left-overlay"></div>
                        <div className="auth-left-content">
                            <Link to="/" className="d-flex align-items-center gap-2 mb-5 text-decoration-none">
                                <img src={logo} alt="Logo" height="52" className="rounded" />
                                <span className="brand-text text-white fs-4">BIMAL TRAVELS</span>
                            </Link>
                            <h2 className="display-5 fw-bold text-white mb-3">Join the Bimal<br />Travel Family</h2>
                            <p className="text-white-75 mb-4 fs-5">Create your free account and start exploring over 500 curated tours, connect with expert guides, and book your dream journey.</p>

                            {/* Benefits */}
                            <ul className="auth-benefits list-unstyled">
                                <li className="d-flex align-items-center gap-3 mb-3">
                                    <div className="benefit-icon"><i className="bi bi-check2-circle text-orange fs-5"></i></div>
                                    <span className="text-white">Access to 500+ exclusive tour packages</span>
                                </li>
                                <li className="d-flex align-items-center gap-3 mb-3">
                                    <div className="benefit-icon"><i className="bi bi-check2-circle text-orange fs-5"></i></div>
                                    <span className="text-white">Save favorites and plan your bucket list</span>
                                </li>
                                <li className="d-flex align-items-center gap-3 mb-3">
                                    <div className="benefit-icon"><i className="bi bi-check2-circle text-orange fs-5"></i></div>
                                    <span className="text-white">Early access to deals and flash sales</span>
                                </li>
                                <li className="d-flex align-items-center gap-3 mb-3">
                                    <div className="benefit-icon"><i className="bi bi-check2-circle text-orange fs-5"></i></div>
                                    <span className="text-white">24/7 support from expert travel advisors</span>
                                </li>
                                <li className="d-flex align-items-center gap-3">
                                    <div className="benefit-icon"><i className="bi bi-check2-circle text-orange fs-5"></i></div>
                                    <span className="text-white">Manage all your bookings in one place</span>
                                </li>
                            </ul>

                            <div className="auth-stats d-flex gap-5 mt-4">
                                <div className="text-center">
                                    <div className="text-orange fw-bold fs-4" mx-5><Counter end={1000} /></div>
                                    <div className="text-white-50 small">Members</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-orange fw-bold fs-4" mx-5>4.9★</div>
                                    <div className="text-white-50 small">Rating</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-orange fw-bold fs-4" mx-5><Counter end={15} /></div>
                                    <div className="text-white-50 small">Years</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="auth-right d-flex align-items-center justify-content-center py-4">
                        <div className="auth-card w-100" style={{ maxWidth: '460px' }}>

                            {/* Mobile Logo */}
                            <div className="d-lg-none text-center mb-4">
                                <Link to="/">
                                    <img src={logo} alt="Logo" height="64" className="rounded" />
                                </Link>
                                <div className="brand-text mt-2">BIMAL TRAVELS</div>
                            </div>

                            <h2 className="fw-bold text-primary-dark mb-1">Create Account</h2>
                            <p className="text-muted mb-4">Join thousands of happy travelers worldwide</p>

                            {/* Social Signup */}
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

                            <div className="auth-divider mb-4"><span>or register with email</span></div>

                            {/* Register Form */}
                            <Form id="registerForm">
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <label className="form-label" htmlFor="uname">Username</label>
                                        <div className="input-group-custom">
                                            <i className="bi bi-person input-icon"></i>
                                            <Field id="uname" name="uname" type="text" className="form-control custom-input ps-5" placeholder="john_doe" />
                                        </div>
                                        <ErrorMessage name='uname'>
                                            {(msg) => <span className='text-danger'>{msg} </span>}
                                        </ErrorMessage>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label" htmlFor="email">Email Address</label>
                                        <div className="input-group-custom">
                                            <i className="bi bi-envelope input-icon"></i>
                                            <Field id="email" name="email" type="email" className="form-control custom-input ps-5" placeholder="john@example.com" />
                                        </div>
                                        <ErrorMessage name='email'>
                                            {(msg) => <span className='text-danger'>{msg} </span>}
                                        </ErrorMessage>
                                    </div>
                                        <div className="col-12">
                                            <label className="form-label" htmlFor="pwd">Password</label>
                                            <div className="input-group-custom">
                                                <i className="bi bi-lock input-icon"></i>
                                                <Field
                                                    type={showPassword ? 'text' : 'password'}
                                                    className="form-control custom-input ps-5 pe-5"
                                                    id="pwd"
                                                    name="pwd"
                                                    placeholder="Min. 8 characters"
                                                />
                                                <button
                                                    type="button"
                                                    className="btn-password-toggle"
                                                    id="toggleRegisterPassword"
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                >
                                                    <i className={`bi ${ showPassword? 'bi-eye-slash': 'bi-eye' }`} id="registerEyeIcon"></i>
                                                </button>
                                            </div>
                                        <ErrorMessage name='pwd'>
                                            {(msg) => <span className='text-danger'>{msg} </span>}
                                        </ErrorMessage>
                                        {/* Password Strength */}
                                        <div className="password-strength mt-2" id="passwordStrength">
                                            <div className="strength-bars d-flex gap-1 mb-1">
                                                <div className="strength-bar" id="bar1"></div>
                                                <div className="strength-bar" id="bar2"></div>
                                                <div className="strength-bar" id="bar3"></div>
                                                <div className="strength-bar" id="bar4"></div>
                                            </div>
                                            <small className="strength-label text-muted" id="strengthLabel">Enter a password</small>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label" htmlFor="cpwd">Confirm Password</label>
                                        <div className="input-group-custom">
                                            <i className="bi bi-lock-fill input-icon"></i>
                                            <Field
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                className="form-control custom-input ps-5 pe-5"
                                                id="cpwd"
                                                name="cpwd"
                                                placeholder="Re-enter your password"
                                            />
                                            <button
                                                type="button"
                                                className="btn-password-toggle"
                                                id="toggleConfirmPassword"
                                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                                            >
                                                <i className={`bi ${ showConfirmPassword? 'bi-eye-slash': 'bi-eye' }`} id="confirmEyeIcon"></i>
                                            </button>
                                        </div>
                                        <ErrorMessage name='cpwd'>
                                            {(msg) => <span className='text-danger'>{msg} </span>}
                                        </ErrorMessage>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex align-items-start gap-2">
                                            <input type="checkbox" className="form-check-input mt-1" id="agreeTerms" required />
                                            <label className="form-check-label text-muted small" htmlFor="agreeTerms">
                                                I agree to the <a href="#" className="text-orange text-decoration-none">Terms of Service</a> and <a href="#" className="text-orange text-decoration-none">Privacy Policy</a>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-orange w-100 py-3 fw-semibold">
                                            <i className="bi bi-person-plus me-2"></i>Create My Account
                                        </button>
                                    </div>
                                </div>
                            </Form>

                            <p className="text-center text-muted mt-4 mb-0">
                                Already have an account? <Link to="/login" className="text-orange fw-semibold text-decoration-none">Sign in</Link>
                            </p>

                            <div className="text-center mt-3">
                                <Link to="/" className="text-muted small text-decoration-none">
                                    <i className="bi bi-arrow-left me-1"></i>Back to Home
                                </Link>
                            </div>

                        </div>
                    </div>
                </>
            )}
        </Formik>
    )
}

export default Register
