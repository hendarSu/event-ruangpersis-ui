//import js cookie
import Cookies from 'js-cookie';

//import router
import Router from 'next/router';

function Profile({user}) {

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
                <li>
                    <button className="btn btn-sm ml-2 text-white">{user.username}</button>
                </li>
                <li className="nav-item">
                    <button onClick={logoutHanlder} className="ml-2 btn btn-sm btn-md btn-danger">Logout</button>
                </li>
            </ul>
        </div>
    )
}

export default Profile
