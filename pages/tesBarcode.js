import React, { useState } from 'react';
import { QrReader } from "react-qr-reader";

function TesBarcode() {
  const [showCam, setShowCam] = useState(false);

  return (
    <div>
      <button className="btn btn-sm btn-success" onClick={() => setShowCam(true)}>Open Cam</button>
      {
        showCam && (
          <QrReader
            delay={300}
            onError={console.log}
            onScan={console.log}
            style={{ width: "500px" }}
          />
        )
      }
    </div>
  )
}

export default TesBarcode