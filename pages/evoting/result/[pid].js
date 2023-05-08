import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';

//import Head
import Head from 'next/head';

//import axios
import axios from 'axios';

//import js cookie
import Cookies from 'js-cookie';

//layout
import Layout from "../../../layouts/default";

const Evoting = () => {
    const router = useRouter()
    const { pid } = router.query;

    const [schedule, setSchedule] = useState({});

    //define state
    const [barcode, setBarcode] = useState("");
    const [votingId, setVotingId] = useState("");

    const [votingObject, setVotingObject] = useState([]);


    //define state validation
    const [validation, setValidation] = useState([]);

    const scheduleData = async () => {
        //fetch user from Rest API
        await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/schedules/evoting/${pid}`)
            .then((response) => {
                setSchedule(current => response.data.data);
                votingData(response.data.data._id);
            })
    }

    const votingData = async (id) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`
        //fetch user from Rest API
        await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/evotings/${id}`)
          .then((response) => {
            setVotingObject(current => response.data.data)
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

    //hook useEffect
    useEffect(() => {
        if (pid && typeof pid !== 'undefined') {
            scheduleData();
        } else {
            Router.push('/event');
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
                        <div className='d-flex flex-row-reverse' style={{
                            padding: "10px"
                        }}>
                            
                            <button className='btn btn-light'>Reload</button>

                            <h5 className='font-weight-light' style={{marginTop: 10, marginLeft: 20}}>Hasil Voting | {schedule.name}</h5>
                        </div>

                        <div className="card border-0 rounded shadow-lg">
                            <div className="card-body">
                                    <div className='mt-4 mb-4 row'>
                                        {votingObject.length > 0 ?
                                            votingObject.map((data, i) => {
                                                return (<div className='col-md-4 col-sm-6 d-flex justify-content-center' key={"object-" + i}>
                                                   
                                                    <label className="btn btn-outline-success m-2" >
                                                        <img src={data.object.image} width={175} />
                                                        <p className='mt-3'>{data.object.name} </p>

                                                        <span className="mt-3 mb-3 badge rounded bg-primary text-white">
                                                        Jumlah Suara : {data.voting} 
                                                        </span>

                                                    </label>
                                                </div>)
                                            }) :
                                            ""}
                                    </div>  
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Evoting