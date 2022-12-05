//layout
import Layout from "../layouts/default";

//import hook react
import { useState, useEffect } from 'react';

//import Head
import Head from 'next/head';

//import router
import Router from 'next/router';

//import axios
import axios from 'axios';

//import js cookie
import Cookies from 'js-cookie';

function Dashboard() {

    //get token
    const token = Cookies.get('token');

    //state user
    const [user, setUser] = useState({});

    //function "fetchData"
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

    //hook useEffect
    useEffect(() => {
        // check token empty
        if (!token) {
            // redirect login page
            Router.push('/');
        } else {
            // call function "fetchData"
            fetchData();
        }
    }, []);

    return (
        <Layout>
            <Head>
                <title>Profile Page</title>
            </Head>
            <div className="container" style={{ marginTop: "80px" }}>
                <div className="row justify-content-center">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body row">
                            <div className="col-md-11">
                                Selamat datang <strong className="text-uppercase">{user.username}</strong>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </Layout>

    )

}

export default Dashboard;