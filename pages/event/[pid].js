import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';

//import Head
import Head from 'next/head';

//import js cookie
import Cookies from 'js-cookie';

//import axios
import axios from 'axios';

//layout
import Layout from "./../../layouts/default";

import EventSubmit from './../../components/submit_event'
import Participant from './../../components/participant'


const Event = () => {
  const router = useRouter()
  const { pid } = router.query;
  const [event, setEvent] = useState({});
  const [eventQuota, setEventQuota] = useState({});
  const [participants, setParticipants] = useState([]);

  const eventData = async (id) => {
    if (pid && typeof pid !== 'undefined') {
      await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/events/public/${id}`)
        .then((response) => {
          setEvent(current => response.data.data);
          eventDataOne(response.data.data._id);
          eventQuotaOne(response.data.data._id);
        }).catch(err => {
          Router.push('/dashboard');
        })
    }
  }

  const eventDataOne = async (id) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`
    //fetch user from Rest API
    await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/event-registers/list/${id}`)
      .then((response) => {
        setParticipants(current => response.data.data);
      })
  }

  const eventQuotaOne = async (id) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`
    //fetch user from Rest API
    await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/event-quota/${id}`)
      .then((response) => {
        setEventQuota(current => response.data.data);
      })
  }

  //hook useEffect
  useEffect(() => {
    //check token
    if (Cookies.get('token')) {
      eventData(pid);
    }

  }, [pid]);

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
            <div className='col-md-8'>
              <div className='shadow-sm'>
                <img src="/imgs/musda.jpg" className="img-fluid rounded-start" alt="..." />
              </div>
            </div>
            <div className='col-md-4'>
              {event.type_event === "PRIVATE" ?
                <EventSubmit event={event} /> : ""
              }
              {event.type_event === "PRIVATE" ?
                    <div className='text-center mt-5'>
                      <h5 className='fw-light'>
                        Untuk Infaq Peserta dapat melalui
                      </h5>
                      <img src="/imgs/musda-rek.png" className="img-fluid rounded-start" alt="..." />
                      <hr />
                      {eventQuota ?
                        <h5 className='text-success fw-bold' >
                          Total Infaq Rp {new Intl.NumberFormat().format(eventQuota.quota * 200000)}
                        </h5>
                        : ""}
                    </div>
                    : ""
                  }
            </div>
            <div className='col-md-12'>
              <div className='row mt-4 p-3 shadow-sm'>
                  <div className='col-md-12'>
                    <h5 className='fw-bold mb-4'>Tentang {event.name}</h5>
                    <p>
                      {event.description}
                    </p>
                    <h5 className=''>Agenda {event.name}</h5>
                    <table className='table table-borderless'>
                      <tbody>
                        <tr>
                          <td width={150}>
                            Tanggal
                          </td>
                          <td width={1}>:</td>
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
                    <h5 className=''>Lokasi</h5>
                    <p>{event.location}</p>
                  </div>
                </div>
            </div>
            <div className='col-md-12 shadow-sm mt-5'>
              <div className='p-3'>
                <h5>
                  <b>Perwakilan Peserta</b> <br />
                  {eventQuota ? <small className='fw-light'>Kuota Tersisa {eventQuota.quota - participants.length}</small> : " "}
                </h5>
                {participants.length > 0 ?
                  <Participant participants={participants} />
                  : ""}
              </div>
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