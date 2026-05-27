import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '/Bimaltravels-logo.png'

const Header = () => {
  let location = useLocation()
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true')
  const [authUser, setAuthUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('authUser') || 'null')
    } catch {
      return null
    }
  })

  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true')
      try {
        setAuthUser(JSON.parse(localStorage.getItem('authUser') || 'null'))
      } catch {
        setAuthUser(null)
      }
    }

    syncAuthState()
    window.addEventListener('auth-changed', syncAuthState)
    window.addEventListener('storage', syncAuthState)

    return () => {
      window.removeEventListener('auth-changed', syncAuthState)
      window.removeEventListener('storage', syncAuthState)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
    window.dispatchEvent(new Event('auth-changed'))
    navigate('/')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Bimal Travels Logo" />
            <div className="navbar-brand-text">
              <div><span className="brand-bimal">BIMAL</span> <span className="brand-travels">TRAVELS</span></div>
              <span className="brand-sub">Tours &amp; Travels</span>
            </div>
          </Link >
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav mx-auto gap-1">
              <li className="nav-item"><Link className={`nav-link ${location.pathname == '/' ? 'active' : ''}`} to={"/"}><i className="bi bi-house me-1"></i>Home</Link ></li>
              <li className="nav-item"><Link className={`nav-link ${location.pathname == '/travels' ? 'active' : ''}`} to={"/travels"}><i className="bi bi-map me-1"></i>Tours</Link ></li>
              <li className="nav-item"><Link className={`nav-link ${location.pathname == '/guides' ? 'active' : ''}`} to={"/guides"}><i className="bi bi-person-badge me-1"></i>Guides</Link ></li>
              <li className="nav-item"><Link className={`nav-link ${location.pathname == '/mybookings' ? 'active' : ''}`} to={"/mybookings"}><i className="bi bi-suitcase2 me-1"></i>My Bookings</Link ></li>
              <li className="nav-item"><Link className={`nav-link ${location.pathname == '/contacts' ? 'active' : ''}`} to={"/contacts"}><i className="bi bi-envelope me-1"></i>Contact</Link ></li>
            </ul>
            <div className="d-flex gap-2 navbar-btn-group align-items-center">
              {isLoggedIn ? (
                <>
                  <span className="btn-accent-outline d-inline-flex align-items-center gap-2" style={{ cursor: 'default' }}>
                    <i className="bi bi-person-circle"></i>
                    <span>{authUser?.username || 'User'}</span>
                  </span>
                  <button type="button" className="btn-accent" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link to={"/login"} className="btn-accent-outline">Login</Link >
                  <Link to={"/register"} className="btn-accent">Register</Link >
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
