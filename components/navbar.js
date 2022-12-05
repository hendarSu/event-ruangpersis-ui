//import hook react
import { useEffect, useState } from 'react';

//import axios
import axios from "axios";

//import js cookie
import Cookies from 'js-cookie';

//import router
import Router from 'next/router';
import Profile from './profile';


function Navbar() {
    //function "fetchData"
    const token = Cookies.get('token');

    //state user
    const [user, setUser] = useState({});

    const fetchData = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/profile`)
            .then((response) => {

                //set response user to state
                setUser(response.data);
            })
    }

    const sectionProfile = async () => {
        // if (user) {
        //     <Profile/>
        // }
    }


    //hook useEffect
    useEffect(() => {

        //check token
        if (Cookies.get('token')) {
            fetchData();

            //redirect page dashboard
            Router.push('/dashboard');
        }

    }, []);

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top fixed-top border-0 shadow-sm">
                <div className="container">
                    <a href='/' className="navbar-brand"><strong className='text-uppercase'>Agenda</strong> | Ruang Persis</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {user.username ? (
                       <Profile user={user}/>
                    ) : ""}
                    
                </div>
            </nav>
        </header>
    )

}

export default Navbar