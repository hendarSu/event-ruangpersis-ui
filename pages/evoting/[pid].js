import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';

//import Head
import Head from 'next/head';

//import axios
import axios from 'axios';

//layout
import Layout from "../../layouts/default";

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
                setVotingObject(current => response.data.data.voting_objects)
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
            schedule_id: schedule._id,
            voting_id: votingId
        }

        //send data to server
        await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/evotings`, data)
            .then((response) => {
                // alert();
                setValidation({
                    success: `Peserta dengan Barcode ${barcode.toUpperCase()} berhasil submit!`
                });
                resetFrom()
                setTimeout(()=> {
                    Router.push('/evoting');
                }, 1000)
            }).catch((error) => {
                //assign error to state "validation"
                resetFrom()
                error.response.data.message = error.response.data.error;
                setValidation(error.response.data);
                resetValidation();
            })
    };

    //hook useEffect
    useEffect(() => {
        if (pid && typeof pid !== 'undefined') {
            scheduleData();
        } else {
            Router.push('/evoting');
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
                                    <div className='mt-4 mb-4 row'>
                                        {votingObject.length > 0 ?
                                            votingObject.map((data, i) => {
                                                return (<div className='col-md-4 col-sm-6 d-flex justify-content-center' key={"object-" + i}>
                                                    <input type="radio" className="btn-check" name="voting_object_id" id={data._id} value={data._id}  autocomplete="off" required  onChange={(e) => setVotingId(e.target.value)}  />

                                                    <label className="btn btn-outline-success m-2" for={data._id} >
                                                        <img src={data.image} width={175} />
                                                        <p className='mt-3'>{data.name} </p>
                                                    </label>
                                                </div>)
                                            }) :
                                            ""}
                                    </div>
                                    <div className="d-flex flex-row btn-group ">
                                        <button type="submit" className="btn btn-sm btn-success"><i className="bi bi-check2-square"></i> Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Evoting