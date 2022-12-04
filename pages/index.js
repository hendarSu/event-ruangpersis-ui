//layout
import Layout from "../layouts/default";

//import hook react
import { useState, useEffect } from 'react';

//import Head
import Head from 'next/head';

//import router
import Router from 'next/router';

//import axios
import axios from "axios";

//import js cookie
import Cookies from 'js-cookie';

function Home() {

  // Define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Define state validation
  const [validation, setValidation] = useState([]);

  //function "loginHanlder"
  const loginHandler = async (e) => {
    e.preventDefault();

    //initialize formData
    const data = {
      username: email,
      password: password
    }
    //send data to server
    await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/v1/auth/login`, data)
      .then((response) => {
        const token = response["data"]["data"]["access_token"];

        // Set token on cookies
        Cookies.set('token', token);

        // Redirect to dashboard
        Router.push('/dashboard');
      })
      .catch((error) => {

        //assign error to state "validation"
        setValidation(error.response.data);
      })
  };

  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <div className="container" style={{ marginTop: '80px' }}>
        <div className="row mt-3">
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Perhatian</h5>
                <p className="card-text">Bagi Cabang yang akan mendaftarkan pesertanya silahakn mendaftarkannya
                  melalui sistem ini.</p>

                {
                  validation.message && (
                    <div className="alert alert-danger">
                      {validation.message}
                    </div>
                  )
                }
                <form onSubmit={loginHandler}>
                  <div className="mb-3">
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan username" />
                  </div>
                  {
                    validation.email && (
                      <div className="alert alert-danger">
                        {validation.email[0]}
                      </div>
                    )
                  }
                  <div className="mb-3">
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password" />
                  </div>
                  {
                    validation.password && (
                      <div className="alert alert-danger">
                        {validation.password[0]}
                      </div>
                    )
                  }
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="shadow-lg">
              <img src='/imgs/events.jpeg' className='img-fluid shadow-4' width="100%"
                alt="" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home