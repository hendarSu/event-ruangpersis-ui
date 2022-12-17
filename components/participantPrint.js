import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import QRCode from 'react-qr-code';

function ParticipantPrint(props) {
  const { data } = props || {};
  const [participantClassName, setParticipantClassName] = useState('d-none');

  console.log(data);

  const participantCardRef = useRef();
  const print = useReactToPrint({
    content: () => participantCardRef.current,
  });

  function handleOnPrint() {

  }

  return (
    <>
      <button className="btn btn-sm btn-success" onClick={() => print()}>Kartu Peserta</button>
      <div className="d-none">
        <div className="position-relative" ref={participantCardRef} style={{
          width: '340px',
        }}>
          <img src="/imgs/participant-card.jpg" alt="Paticipant Card" className="w-100" />
          <div
            className="position-absolute"
            style={{
              bottom: '30px',
              left: '110px'
            }}
          >
            <div id="barcode" className="p-2 rounded bg-white border">
              <QRCode
                size={115}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={data.barcode}
                viewBox={`0 0 115 115`}
              />
            </div>
            <div id="participant">
              <p
                className="text-center text-bold mb-1"
                style={{ fontWeight: '600' }}
              >
                {data.barcode}
              </p>
              <p
                className="mb-1 text-center"
                style={{ fontWeight: 'bold', fontSize: '16px', textTransform: 'uppercase' }}
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
      </div>
    </>

  )
}

export default ParticipantPrint