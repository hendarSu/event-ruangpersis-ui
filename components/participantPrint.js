import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import QRCode from 'react-qr-code';

function ParticipantPrint(props) {
  const { data } = props;
  const participantCardRef = useRef();

  return (
    <>
      <ReactToPrint
        trigger={() => {
          return (
            <button className="btn btn-sm btn-success">Kartu Peserta</button>
          );
        }}
        documentTitle={data.barcode}
        content={() => participantCardRef.current}
        pageStyle={`@page { size: 90mm 123mm; margin: 5mm }`}
      />
      <div className="d-none">
        <div className="position-relative" ref={participantCardRef} style={{
          width: '340px',
          margin: 0
        }}>
          {/* <img src="/imgs/participant-card.jpg" alt="Paticipant Card" className="w-100" /> */}
          <div
            className="position-absolute"
            style={{
              width: '125px',
              top: '220px',
              left: '110px'
            }}
          >
            <div id="barcode" className="p-2 rounded bg-white border">
              <QRCode
                size={125}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={data.barcode}
                viewBox={`0 0 125 125`}
              />
            </div>
          </div>
          <div
            id="participant"
            className="position-absolute"
            style={{
              top: '355px',
              width: '100%',
            }}
          >
            <p
              className="text-center text-bold mb-1"
              style={{ fontWeight: '600', fontSize: '12px' }}
            >
              {data.barcode}
            </p>
            <p
              className="mb-1 text-center"
              style={{ fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase' }}
            >
              {data.participant.name}
            </p>
            <p
              className="text-center"
              style={{ fontWeight: '500', fontSize: '12px', textTransform: 'uppercase' }}
            >
              PC {data.participant.pc}
            </p>
          </div>
        </div>
      </div>
    </>

  )
}

export default ParticipantPrint