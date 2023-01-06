import Layout from "./../../layouts/default";


import React from "react";
import QrReader from "react-qr-reader";
//import hook react
import { useState, useEffect } from 'react';

//import Head
import Head from 'next/head';

function Presences() {
    const [showCam, setShowCam] = useState(false);
      const [qrCodeContent, setQrCodeContent] = useState();
  
      const handleScan = async (data) => {
          if (data) {
              setQrCodeContent(data);
              setShowCam(false)
          }
      };
  
      const handleError = async (err) => {
          console.error(err);
      };
  
      const handleChange = async (event) => {
          this.setState({ qrCodeContent: event.target.value });
      };
  
      const handleClick = async () => {
          setShowCam(current => true);
      };
  
      return (
          // <Layout>
          //     <Head>
          //         <title>Presences Account</title>
          //     </Head>
              <div className="mt-5">
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
  
                  <p>QR Code</p>
                  <textarea
                      rows="10"
                      cols="50"
                      value={qrCodeContent}
                      onChange={handleChange}
                  />
              </div>
          // </Layout>
      )
  }
  
  export default Presences