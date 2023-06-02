import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';

//import Head
import Head from 'next/head';

//import js cookie
import Cookies from 'js-cookie';

//import axios
import axios from 'axios';

//layout
import Layout from "./../../../layouts/default";
import Schedules from '../../../components/schedules';
import Participant from './../../../components/participant'

const EventDetail = () => {
    const router = useRouter()
    const { pid } = router.query;
    const [event, setEvent] = useState({});
    const [schedules, setSchedules] = useState([]);
    const [participants, setParticipants] = useState([]);

    const eventData = async () => {
        if (!pid && typeof pid === 'undefined') {
            //redirect page dashboard
            Router.push('/event');
        } else {
            //fetch user from Rest API
            await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/events/detail/${pid}`)
                .then((response) => {
                    setEvent(current => response.data.data);
                    eventSchedule(response.data.data._id);
                    eventDataOne(response.data.data._id);
                })
        }
    }

    const eventSchedule = async (id) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`
        //fetch user from Rest API
        await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/events/schedules/${id}`)
            .then((response) => {
                setSchedules(current => response.data.data);
            })
    }

    const eventDataOne = async (id) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`
        //fetch user from Rest API
        await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/event-registers/paritcipants/${id}`)
            .then((response) => {
                setParticipants(current => response.data.data);
            })
    }


    //hook useEffect
    useEffect(() => {
        //check token
        if (Cookies.get('token')) {
            eventData();
        }

    }, []);

    return (
        <Layout>
            <Head>
                {(event && pid) ?
                    <title>{event.name}</title>
                    : <title>Event tidak ditemukan!</title>}

                {(event && pid) ? <meta
                    name="description"
                    content={event.description}
                /> : ""}

            </Head>

            <div className='container mt-5'>
                {(event && pid) ?
                    <div className='row' style={{
                        marginTop: "100px"
                    }} >
                        <div className='col-md-5'>
                            <div className='shadow-sm'>
                                <img src="/imgs/musda.jpeg" className="img-fluid rounded-start" alt="..." />
                            </div>
                        </div>
                        <div className='col-md-7'>
                            <div className='row mt-4'>
                                <h5 className='fw-light'>Agenda {event.name}</h5>
                                <table className='table'>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Tanggal
                                            </td>
                                            <td>:</td>
                                            <td>
                                                {event ? event.date : event.date} s/d Selesai
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Waktu Mulai
                                            </td>
                                            <td>:</td>
                                            <td>
                                                {event.time} WIB
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <h5 className='fw-light'>Lokasi</h5>
                                <p>{event.location}</p>
                            </div>
                            <hr />
                            <div className=''>
                                <h5 className='fw-light'>
                                    Jadwal Acara
                                </h5>
                                {schedules.length > 0 ?
                                    <Schedules schedules={schedules} />
                                    : ""}
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <hr />
                            <h5 className='fw-light'>Jumlah Peserta : {participants.length} Orang</h5>
                            <hr />
                            {participants.length > 0 ?
                                <Participant participants={participants} />
                                : ""}
                        </div>
                    </div>
                    :
                    <div className='row' style={{
                        marginTop: "100px"
                    }}>
                        <div className='col-md-12'>
                            <div className='shadow-sm text-center' style={{
                                padding: "10px"
                            }}>
                                <h2 className='font-weight-light'>Maaf event tidak ditemukan!</h2>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </Layout>
    )
}

export default EventDetail