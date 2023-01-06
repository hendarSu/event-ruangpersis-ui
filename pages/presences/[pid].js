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
import SubmitPresence from '../../components/submit_presence';
import PresencesList from '../../components/presences';

const Presences = () => {
    const router = useRouter()
    const { pid } = router.query;
    const [schedule, setSchedule] = useState({});
    const [schedulePresence, setSchedulePresence] = useState({});

    const scheduleData = async () => {

        if (!pid && typeof pid === 'undefined') {
            //redirect page dashboard
            Router.push('/event');
        } else {
            //fetch user from Rest API
            await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/schedules/${pid}`)
                .then((response) => {
                    setSchedule(current => response.data.data);
                })
        }
    }

    const presenceData = async (id) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`
        //fetch user from Rest API
        await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/schedule-presences/${id}`)
            .then((response) => {
                setSchedulePresence(response.data.data);
            })
    }

    //hook useEffect
    useEffect(() => {
        //check token
        if (Cookies.get('token')) {
            scheduleData();
            presenceData(pid);
        }

    }, []);

    return (
        <Layout>
            <Head>
                {(schedule && pid) ?
                    <title>{schedule.name}</title>
                    : <title>Schedule tidak ditemukan!</title>}
            </Head>

            <div className='container mt-2'>
                <div className='row' style={{
                    marginTop: "85px"
                }}>
                    <div className='col-md-12'>
                        <div className='text-center' style={{
                            padding: "10px"
                        }}>
                            <h5 className='font-weight-light'>{schedule.name}</h5>
                        </div>

                        <SubmitPresence schedule={schedule} />

                        {schedulePresence.length > 0 ?
                            <PresencesList participants={schedulePresence} />
                            : ""}

                        {/* {schedulePresence ?  */}
                        {/* <PresencesList participants={schedulePresence}/>: ""} */}

                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Presences