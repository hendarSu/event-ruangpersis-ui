import Router from 'next/router';
import Cookies from 'js-cookie';

import style from './style.module.scss';

function UserWidgetLink({ user }) {
  console.log('🚀 ~ file: UserWidgetLink.jsx:8 ~ UserWidgetLink ~ user', user);

  //function logout
  const logoutHanlder = async () => {

    //remove token from cookies
    Cookies.remove('token');

    //redirect halaman login
    Router.push('/');

  };

  return (
    <div className="flex-shrink-0 dropdown d-flex w-100 justify-content-end">
      <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <i className="bi bi-person-circle" />
      </a>
      <ul className={`dropdown-menu ${style['dropdown']}`}>
        <li><a className="dropdown-item" href="#"><i className="bi me-2 bi-person-circle" /> Profile</a></li>
        <li><a className="dropdown-item" href="#"><i className="bi me-2 bi-calendar2" /> Histori</a></li>
        <li><a href="#" onClick={logoutHanlder} className="dropdown-item tex-danger"> <i className="bi me-2 bi-box-arrow-left" /> Keluar</a></li>
      </ul>
    </div>
  );
}

export default UserWidgetLink;
