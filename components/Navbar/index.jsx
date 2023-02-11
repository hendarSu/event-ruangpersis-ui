//import hook react
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';

import UserWidgetLink from '../UserWidgetLink';

import style from './style.module.scss';

function Navbar() {
  //function "fetchData"
  const token = Cookies.get('token');

  //state user
  const [user, setUser] = useState({});

  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/profile`)
      .then((response) => {
        //set response user to state
        setUser(response.data);
      });
  };

  //hook useEffect
  useEffect(() => {
    //check token
    if (Cookies.get('token')) {
      fetchData();
    }
  }, []);

  return (
    <header className={`mb-3 navbar-expand-lg ${style['navbar-expand-lg']} fixed-top `}>
      <div className={`container p-md-0 px-3 d-grid gap-3 align-items-center ${style['navbar-wrapper']}`}>
        <div className="d-flex flex-row-reverse flex-md-row justify-content-between">
          <Link href="/dashboard" className="navbar-brand my-auto">
            <img src="/imgs/main-logo.svg" alt="Persis Logo Utama" />
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
            <i className="bi bi-list" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav align-items-center me-auto mb-2 mb-lg-0 px-5">
              <li className="d-flex flex-row">
                <Link href="/activity" className={`${style['nav-item']}`}>
                  <img src="/navbar/activity.svg" className="me-2" width="20px" alt="Aktivitas icon" />Cari Aktivitas
                </Link>
              </li>

              {
                user.username ? (
                  <>
                    <li className="d-flex flex-row">
                      <Link href="/my-agenda" className={`${style['nav-item']}`}>
                        <img src="/navbar/agenda.svg" className="me-2" width="20px" alt="Agenda icon" /> Agenda Saya
                      </Link>
                    </li>

                    <li className="d-flex flex-row">
                      <Link href="/favorite" className={`${style['nav-item']}`}>
                        <img src="/navbar/favorite.svg" className="me-2" width="20px" alt="Agenda icon" /> Favorit
                      </Link>
                    </li>
                  </>
                ) : null
              }
            </ul>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-end">
          {
            user.username ? (
              <UserWidgetLink user={user} />
            ) : null
          }

          {/* <div className="flex-shrink-0 dropdown">
            <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
            </a>
            <ul className="dropdown-menu text-small shadow">
              <li><a className="dropdown-item" href="#">New project...</a></li>
              <li><a className="dropdown-item" href="#">Settings</a></li>
              <li><a className="dropdown-item" href="#">Profile</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Sign out</a></li>
            </ul>
          </div> */}
        </div>
      </div>

      <div className="offcanvas offcanvas-start d-md-none" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        {/* <div className="offcanvas-body">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li><a className="me-2" width="20px" alt="" href="#">Cari Aktivitas</a></li>
            {
              user.username ? (
                <li className={">
                 `${style['nav-item']} <Link className="`}tn btn-sm btn-light" href="/event">
                    <i className="bi bi-calendar-event" /> Agenda Saya
                  </Link>
                </li>
              ) : null
            }
          </ul>
        </div> */}
      </div>
    </header >

  );
}

export default Navbar;