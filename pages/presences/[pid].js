import Layout from "./../../layouts/default";


import React, { Component } from "react";
import QrReader from "react-qr-reader";
//import hook react
import { useState, useEffect } from 'react';


//import Head
import Head from 'next/head';

const Presences = () => {

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
        <Layout>
            <Head>
                <title>Presences Account</title>
            </Head>
            <div>
            <button onClick={handleClick}>
                {showCam
                    ? " Close camera reader..."
                    : " Open camera reader"}
            </button>
            { showCam ? (
                <div>
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: "100%" }}
                    />
                </div>
            ) : null}

            
            <p>QR Code</p>
            <textarea
                rows="10"
                cols="50"
                value={qrCodeContent}
                onChange={handleChange}
            />
        </div>
        </Layout>
       
    )
}

export default Presences