//import hook react
import { useEffect, useState } from 'react'

//import axios
import axios from 'axios'

//import js cookie
import Cookies from 'js-cookie'

//import router
import Profile from './profile'
import Link from 'next/link'

function Navbar() {
  //function "fetchData"
  const token = Cookies.get('token')

  //state user
  const [user, setUser] = useState({})

  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    //fetch user from Rest API
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/profile`)
      .then((response) => {
        //set response user to state
        setUser(response.data)
      })
  }

  //hook useEffect
  useEffect(() => {
    //check token
    if (Cookies.get('token')) {
      fetchData()
    }
  }, [])

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top fixed-top border-0 shadow-sm">
        <div className="container">
          <Link href="/dashboard" className="navbar-brand">
            <strong className="text-uppercase">Agenda</strong> | Ruang Persis
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {user.username ? (
            <Profile user={user} />
          ) : (
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link href="/register"
                    className="ml-2 btn btn-sm btn-md btn-light"
                  >
                    Registrasi
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
