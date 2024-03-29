import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';

import EvotingComponent from '../../components/voting_component';

function Evoting() {

  //state user
  const [event, setEvent] = useState([]);

  const eventData = async () => {
    //fetch user from Rest API
    await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/events/evotings`)
      .then((response) => {
        setEvent(() => response.data.data);
      });
  };


  //hook useEffect
  useEffect(() => {
    // call function "fetchData"
    eventData();
  }, []);

  return (
    <>
      <Head>
        <title>Agenda | Event Ruang Persis</title>
      </Head>
      <div className="container" style={{ marginTop: '80px' }}>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card border-0 rounded shadow-sm">
              <div className="card-body row">
                <div className="col-md-11">
                  Tentukan pilihan terbaik anda selama menginput data voting.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <EvotingComponent event={event} />
        </div>
      </div>
    </>
  );

}

export default Evoting;