import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Myroute from './Myroute.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './assets/bootsstrap.min.css'
import './assets/bootstrap.bundle.min.js'
import './assets/style.css'

createRoot(document.getElementById('root')).render(
  <>
    <Myroute />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      toastStyle={{
        background: 'linear-gradient(135deg, #116d4e 0%, #1f9d72 55%, #27b27f 100%)',
        color: '#f5fff9',
        border: '1px solid rgba(255, 255, 255, 0.28)',
        boxShadow: '0 0 14px rgba(39, 178, 127, 0.45), 0 8px 22px rgba(0, 0, 0, 0.2)',
        textShadow: '0 0 6px rgba(245, 255, 249, 0.5)',
        backdropFilter: 'blur(3px)'
      }}
      progressStyle={{
        background: 'linear-gradient(90deg, #d7ffef 0%, #ffffff 100%)',
        boxShadow: '0 0 8px rgba(255, 255, 255, 0.75)'
      }}
    />
  </>,
)
