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

// Component
import Event from '../components/event_component';

function Dashboard() {

    //get token
    const token = Cookies.get('token');

    //state user
    const [user, setUser] = useState({});

    //state user
    const [event, setEvent] = useState([]);

    const eventData = async () => {

        //fetch user from Rest API
        await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/events/public`)
            .then((response) => {
                setEvent(current => response.data.data);
            })
    }

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
            eventData();
        }
    }, []);

    return (
        <Layout>
            <Head>
                <title>Profile</title>
            </Head>
            <div className="container" style={{ marginTop: "80px" }}>
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body row">
                                <div className="col-md-11">
                                    Selamat datang <strong className="text-uppercase">{user.username}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <Event event={event} />
                </div>
            </div>
        </Layout>
    )

}

export default Dashboard;