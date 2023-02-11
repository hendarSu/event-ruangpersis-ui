//import hook react
import { useState } from 'react';

//import axios
import axios from 'axios';

//import js cookie
import Cookies from 'js-cookie';

import { useRouter } from 'next/router';

function SubmitPresence({ schedule }) {

  const router = useRouter();

  //define state
  const [barcode, setBarcode] = useState('');

  //define state validation
  const [validation, setValidation] = useState([]);

  const token = Cookies.get('token');

    
  //function "loginHanlder"
  const submitHandler = async (e) => {
    e.preventDefault();

    //initialize formData
    const data = {
      barcode: barcode,
      schedule_id: schedule._id
    };


    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    //send data to server
    await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/schedule-presences`, data)
      .then(() => {
        alert(`Peserta dengan Barcode ${barcode} telah Hadir!`);
        router.reload(window.location.pathname);
      }).catch((error) => {
        console.log(error);
        //assign error to state "validation"
        error.response.data.message = error.response.data.error;
        setValidation(error.response.data);
      });
  };


  return (
    <div className="card border-0 rounded shadow-lg">
      <div className="card-body">
        {
          validation.message && (
            <div className="alert alert-danger">
              {validation.message}
            </div>
          )
        }
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <input type="text" className="form-control" value={barcode} onChange={(e) => setBarcode(e.target.value)} placeholder="Masukkan Barcode" required />
          </div>
          {
            validation.npa && (
              <div className="alert alert-danger">
                {validation.npa[0]}
              </div>
            )
          }
          <div className="d-flex flex-row btn-group ">
            <button type="button" className="btn btn-sm btn-info"><i className="bi bi-qr-code-scan" /> Scan Barcode</button>
            <button type="submit" className="btn btn-sm btn-primary"><i className="bi bi-calendar-check" /> Hadir</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubmitPresence;