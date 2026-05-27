import React from 'react'
import Header from './compoenents/Header'
import Footer from './compoenents/Footer'
import { Outlet } from 'react-router-dom'

const Base = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Base
