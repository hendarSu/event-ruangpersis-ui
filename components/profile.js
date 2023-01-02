//import js cookie
import Cookies from 'js-cookie';

//import router
import Router from 'next/router';

function Profile({ user }) {

    //function logout
    const logoutHanlder = async () => {

        //remove token from cookies
        Cookies.remove("token");

        //redirect halaman login
        Router.push('/');

    };

    return (
        <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <button className="btn ml-2 text-white"><i className="bi bi-person-circle"></i> {user.username}</button>
                    </a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#"><i className="bi bi-person-circle"></i> Profile</a></li>
                        <li><a className="dropdown-item" href="#"><i className="bi bi-calendar2"></i> History</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                         <a onClick={logoutHanlder} className="dropdown-item"> <i className="bi bi-box-arrow-left"></i> logout</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default Profile
