import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Ratingstar from '../compoenents/Ratingstar'
import { toast } from 'react-toastify'

const Travels = () => {

  const [travels, setTravels] = useState([])
  const [search, setSearch] = useState("")
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/travels?format=json')
      .then(res => setTravels(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'))
  }, [])




  const handleSearch = (e) => {
    setSearch(e.target.value)
  }



  const filteredTravels = travels.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase()) || item.region.toLowerCase().includes(search.toLowerCase())
  })


  const toggleFav = (id) => {
    if (localStorage.getItem('isLoggedIn') !== 'true') return toast.error('Please log in first.')
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
      return updatedFavorites
    })
  }

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
              <li className="breadcrumb-item active">Destinations</li>
            </ol>
          </nav>
          <h1 className="page-hero-title">All <span>Tour</span> <span></span></h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '550px', fontSize: '1rem' }}>
            Explore our carefully curated selection of tours and adventures around the world.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="d-flex align-items-center gap-3 mb-5 justify-content-end">
            <label
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--text-muted)",
                whiteSpace: "nowrap"
              }}
            >
              Search your desired tour:
            </label>
            <input type='text' placeholder='Enter  your tour ' onChange={handleSearch} value={search} style={{ border: '2px solid var(--border)', borderRadius: '8px', padding: '7px 16px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}></input>
            <button className="btn-accent"><i className="bi bi-search"></i></button>
          </div>
          <div className="row g-4">
            {
              filteredTravels.map((item) => (
                <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-duration="1000" key={item.id}>
                  <div className="tour-card">
                    <div className="tour-card-img">
                      <img
                        src={item.image}
                        alt={item.title}
                      />
                      {item.trending ? <span className="tour-card-badge">Trending</span> : null}
                      <button
                        className="tour-card-wishlist"
                        type="button"
                        onClick={() => toggleFav(item.id)}
                      >
                        <i
                          className={favorites.includes(item.id) ? "bi bi-heart-fill" : "bi bi-heart"}
                          style={{ color: favorites.includes(item.id) ? "#ef4444" : "#000" }}
                        ></i>
                      </button>
                    </div>
                    <div className="tour-card-body">
                      <div className="tour-card-region">
                        <i className="bi bi-geo-alt-fill text-accent"></i>{' '}
                        {item.region}
                      </div>
                      <h3 className="tour-card-title">{item.title}</h3>
                      <div className="tour-card-meta">
                        <span className="tour-meta-item">
                          <i className="bi bi-clock text-accent"></i> {item.time_of_completion} Days
                        </span>
                        <span className="tour-meta-item">
                          <i className="bi bi-bar-chart text-accent"></i> {item.difficulty}
                        </span>
                        <span className="tour-meta-item">
                          <i className="bi bi-people text-accent"></i> Max {item.max_people}
                        </span>
                      </div>
                      <div className="tour-card-footer">
                        <div className="tour-price">
                          <span className="tour-price-from">From</span>
                          <span className="tour-price-amount">
                            ${item.per_person_fee}
                          </span>
                          <span className="tour-price-per">/person</span>
                        </div>
                        <div className="d-flex flex-column align-items-end gap-2">
                          <div className="star-rating">
                            <Ratingstar rating={item.rating} />
                            <span className="count">({item.rating})</span>
                          </div>
                          <Link
                            to={`/tourdetail/${item.id}`}
                            className="btn-accent"
                            style={{ padding: '8px 18px', fontSize: '0.82rem' }}
                          >
                            View Tour
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </>
  )

}

export default Travels
