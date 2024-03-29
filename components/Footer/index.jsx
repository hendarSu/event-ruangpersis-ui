
import Link from 'next/link';

import style from './style.module.scss';

function Footer() {
  return (
    <footer className={`row py-4 border-top px-4 px-md-5 ${style['footer']} w-100`}>
      <div className="container row my-auto px-md-5 my-md-5 text-white fw-light">
        <div className="row">
          <div className="col-12 mb-5">
            <Link href="/" className="navbar-brand my-auto">
              <img src="/imgs/logo.svg" alt="Persis Logo" />
            </Link>
          </div>

          <div className="col-12 col-md-3 mb-3">
            <p className="text-small m-0">Ruang Persis adalah Lorem ipsum dolor sit amet consectetur. Purus lacus cursus eu egestas neque urna mauris sagittis. </p>
          </div>

          <div className="col-12 col-md-5 mb-2 my-4 my-sm-0 px-2px px-sm-10 mb-4 mb-sm-0">
            <h6 className="text-small">About Us</h6>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="#" className="p-0">Contact Us</a></li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <form>
              <h6 className="text-small">Subscribe to our Newsletter</h6>
              <p>Get the latest update for exciting events around you!</p>
              <div className={`input-group mb-3 ${style['subscribe']}`}>
                <input type="text" className={`px-3 form-control ${style['form-control']}`} placeholder="Enter your email" aria-label="Enter your email" aria-describedby="basic-addon2" />
                <span className={`${style['mail']}`} />
              </div>
            </form>
          </div>

          <div className="col-12">
            <p className="m-0">©2023  Ruang Persis . All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;