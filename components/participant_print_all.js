import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import ParticipantCard from './participant_card';

function ParticipantPrintAll({ participants }) {
  const participantCardRef = useRef(null);

  return (
    <>
      <ReactToPrint
        trigger={() => <button className="btn btn-sm btn-success">Print All</button>}
        content={() => participantCardRef.current}
        pageStyle={`@page { size: 90mm 123mm; margin: 5mm }`}
      />
      <div className="d-none">
        <div ref={participantCardRef}>
          <TemplatePrintAll datas={participants} />
        </div>
      </div>
    </>
  )
}

function TemplatePrintAll({ datas }) {
  let printPages = [];

  for (const data of datas) {
    const tempTemplate = <ParticipantCard key={data.barcode} data={data} />;
    printPages.push(tempTemplate);
  }

  return (
    <div>{printPages}</div>
  )
}

export default ParticipantPrintAll;