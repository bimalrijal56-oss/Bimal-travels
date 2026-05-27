import React, { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import App from './App'
import Travels from './pages/Travels'
import Base from './Base'
import Homepage from './pages/Homepage'
import Contacts from './pages/Contacts'
import MyBooking from './pages/MyBooking'
import Guide from './pages/Guide'
import Register from './pages/Register'
import Login from './pages/Login'
import Tourdetails from './pages/Tourdetails'
import Guidedetails from './pages/Guidedetails'
import Bookingdetails from './pages/Bookingdetails'


const ScrollToTop = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return null
}


const Myroute = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Base />}>
          <Route index element={<Homepage />}></Route>
          <Route path='travels' element={<Travels />}></Route>
          <Route path='contacts' element={<Contacts />}></Route>
          <Route path='mybookings' element={<MyBooking />}></Route>
          <Route path='guides' element={<Guide />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='tourdetail' element={<Navigate to='/travels' replace />}></Route>
          <Route path='tourdetail/:id' element={<Tourdetails />}></Route>
          <Route path='guidedetail' element={<Navigate to='/guides' replace />}></Route>
          <Route path='guidedetail/:id' element={<Guidedetails />}></Route>
          <Route path='bookingdetail' element={<Navigate to='/mybookings' replace />}></Route>
          <Route path = 'bookingdetail/:id' element={<Bookingdetails />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Myroute
