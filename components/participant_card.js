import React from 'react'
import QRCode from 'react-qr-code'

function ParticipantCard({ data }) {
  return (
    <div className="position-relative" style={{
      width: '340px',
      margin: 0,
      pageBreakAfter: 'always'
    }}>
      <img src="/imgs/participant-card.jpeg" alt="Paticipant Card" className="w-100" />
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
  )
}

export default ParticipantCard