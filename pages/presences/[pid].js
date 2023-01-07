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
import PresencesList from '../../components/presences';

const Presences = () => {
    const router = useRouter()
    const { pid } = router.query;
    const [schedule, setSchedule] = useState({});
    const [schedulePresence, setSchedulePresence] = useState({});

    //define state
    const [barcode, setBarcode] = useState("");

    //define state validation
    const [validation, setValidation] = useState([]);

    const scheduleData = async () => {
        //fetch user from Rest API
        await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/schedules/${pid}`)
            .then((response) => {
                setSchedule(current => response.data.data);
            })

    }

    const presenceData = async (id) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`
        //fetch user from Rest API
        await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/schedule-presences/${id}`)
            .then((response) => {
                setSchedulePresence(response.data.data);
            })
    }

    const resetFrom = async () => {
        setBarcode("");
    }

    const resetValidation = async () => {
        var delayInMilliseconds = 2000; //2 second
        setTimeout(function () {
            //your code to be executed after 2 second
            setValidation({
                message: null,
                success: null
            });
        }, delayInMilliseconds);
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        //initialize formData
        const data = {
            barcode: barcode,
            schedule_id: schedule._id
        }

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`

        //send data to server
        await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/schedule-presences`, data)
            .then((response) => {
                // alert();
                setValidation({
                    success: `Peserta dengan Barcode ${barcode.toUpperCase()} berhasil ditambahkan!`
                });
                // router.reload(window.location.pathname)
                resetFrom()
                presenceData(pid);
                resetValidation();
            }).catch((error) => {
                resetFrom()
                //assign error to state "validation"
                error.response.data.message = (error.response.data.error === "Peserta tidak terdaftar!")? error.response.data.error : `Peserta dengan Barcode ${barcode.toUpperCase()} sudah menghadiri sesi ini!`;
                setValidation(error.response.data);
                resetValidation();
            })
    };

    //hook useEffect
    useEffect(() => {
        if (!pid && typeof pid === 'undefined') {
            //redirect page dashboard
            Router.push('/event');
        } else {
            //check token
            if (Cookies.get('token')) {
                scheduleData();
                presenceData(pid);
            }
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

                        {/* <SubmitPresence schedule={schedule} /> */}

                        <div className="card border-0 rounded shadow-lg">
                            <div className="card-body">
                                {
                                    validation.message && (
                                        <div className="alert alert-danger">
                                            {validation.message}
                                        </div>
                                    )
                                }
                                {
                                    validation.success && (
                                        <div className="alert alert-success">
                                            {validation.success}
                                        </div>
                                    )
                                }
                                <form onSubmit={submitHandler}>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" value={barcode} onChange={(e) => setBarcode(e.target.value)} placeholder="Masukkan Barcode" required />
                                    </div>
                                    <div className="d-flex flex-row btn-group ">
                                        <button type="button" className="btn btn-sm btn-info"><i className="bi bi-qr-code-scan"></i> Scan Barcode</button>
                                        <button type="submit" className="btn btn-sm btn-primary"><i className="bi bi-calendar-check"></i> Hadir</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {schedulePresence.length > 0 ?
                            <PresencesList participants={schedulePresence} />
                            : ""}
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Presences