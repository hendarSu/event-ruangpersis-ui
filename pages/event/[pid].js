import { useRouter } from 'next/router';
//layout
import Layout from "./../../layouts/default";

//import Head
import Head from 'next/head';

import { useEffect, useState } from 'react';

//import js cookie
import Cookies from 'js-cookie';

//import axios
import axios from 'axios';

import EventSubmit from './../../components/submit_event'

import Participant from './../../components/participant'

//import router
import Router from 'next/router';

const Event = () => {
  const router = useRouter()
  const { pid } = router.query;
  const [event, setEvent] = useState({});
  const [participants, setParticipants] = useState([]);

  const eventData = async () => {
    if (!pid && typeof pid === 'undefined') {
      //redirect page dashboard
      Router.push('/dashboard');
    } else {
      //fetch user from Rest API
      await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/events/public/${pid}`)
        .then((response) => {
          setEvent(current => response.data.data);
          eventDataOne(response.data.data._id);
        })
    }
  }

  const eventDataOne = async (id) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`
    //fetch user from Rest API
    await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/event-registers/${id}`)
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
        {(event && pid) ? <title>{event.name}</title> : <title>Event tidak ditemukan!</title>}
      </Head>

      <div className='container mt-5'>
        {(event && pid) ?
          <div className='row' style={{
            marginTop: "100px"
          }} >
            <div className='col-md-6'>
              <div className='shadow-lg'>
                <img src="/imgs/events.jpeg" className="img-fluid rounded-start" alt="..." />
              </div>
            </div>
            <div className='col-md-6'>
              <EventSubmit event={event} />

              <div className='mt-4'>
                <h5 className='fw-light'>Tentang {event.name}</h5>
                <p>
                  {event.description}
                </p>
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
            </div>
            <div className='col-md-12'>
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

export default Event