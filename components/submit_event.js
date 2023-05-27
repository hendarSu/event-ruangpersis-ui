//import hook react
import { useState } from 'react';

//import router
import Router from 'next/router';

//import axios
import axios from "axios";

//import js cookie
import Cookies from 'js-cookie';

function EventSubmit({ event }) {

    //define state
    const [npa, setNpa] = useState("");
    const [eventId, setEventId] = useState("");

    //define state validation
    const [validation, setValidation] = useState([]);

    const token = Cookies.get('token');

    //function "loginHanlder"
    const submitHandler = async (e) => {
        e.preventDefault();

        //initialize formData
        const data = {
            npa: npa,
            event_id: eventId
        }

        data.event_id = event._id

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        //send data to server
        await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/event-registers`, data)
            .then((response) => {
                alert(`Anggota dengan NPA ${npa} Berhasil Didaftarkan`);
                window.location.href = '/event/'+event.slug
            })
            .catch((error) => {
                //assign error to state "validation"
                error.response.data.message = error.response.data.error;
                setValidation(error.response.data);
            })
    };


    return (
        <div className="card border-0 rounded shadow">
            <div className="card-body">
                <h5 className="fw-light">Daftarkan Peserta {event.name}</h5>
                <hr />
                {
                    validation.message && (
                        <div className="alert alert-danger">
                            {validation.message}
                        </div>
                    )
                }
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label className="form-label">Nomor Pokok Anggota</label>
                        <input type="text" className="form-control" value={npa} onChange={(e) => setNpa(e.target.value)} placeholder="Masukkan npa" required />
                        <input type="text" hidden className="form-control" value={event} onChange={(e) => setEventId(event._id)} />

                    </div>
                    {
                        validation.npa && (
                            <div className="alert alert-danger">
                                {validation.npa[0]}
                            </div>
                        )
                    }
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn  btn-primary">Daftarkan</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EventSubmit