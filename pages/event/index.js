//layout
import Layout from "../../layouts/default";

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
import MyEventComponent from '../../components/myevent_component';

function Event() {

    //get token
    const token = Cookies.get('token');

    //state user
    const [user, setUser] = useState({});

    //state user
    const [event, setEvent] = useState([]);

    const eventData = async () => {

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        //fetch user from Rest API
        await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/events`)
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
                <title>Agenda Saya | Event Ruang Persis</title>
            </Head>
            <div className="container" style={{ marginTop: "80px" }}>
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body row pr-3 pl-3">
                                <h5 className="card-title">Agenda <strong >Saya</strong></h5>
                                <hr/>
                                <p className="card-text">
                                    Berikut merupakan daftar agenda yang anda selengarakan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <MyEventComponent event={event} />
                </div>
            </div>
        </Layout>
    )

}

export default Event;