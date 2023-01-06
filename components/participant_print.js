import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

import ParticipantCard from './participant_card';

function ParticipantPrint(props) {
  const { data } = props || {};
  const participantCardRef = useRef();

  return (
    <>
      <ReactToPrint
        trigger={() => {
          return (
            <button className="btn btn-sm btn-success">Kartu Peserta</button>
          );
        }}
        content={() => participantCardRef.current}
        pageStyle={`@page { size: 90mm 123mm; margin: 5mm }`}
      />
      <div className="d-none">
        <div ref={participantCardRef}>
          <ParticipantCard data={data} />
        </div>
      </div>
    </>

  )
}

export default ParticipantPrint