
import { useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import Card from '../../components/Card';
import useAuth from '../../hooks/useAuth';
import style from './styles.module.scss';

function Login() {

  // Define state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  // Define state validation
  const [validation, setValidation] = useState([]);

  //function "loginHanlder"
  const loginHandler = async (e) => {
    e.preventDefault();

    //initialize formData
    const payload = {
      username: email,
      password: password
    };

    login(payload).then(() => {
      Router.push('/dashboard');

    }).catch((error) => {
      if(error.response?.data) {
        error.response.data.exception.message = 'Username dan Password salah!';
        //assign error to state "validation"
        setValidation(error.response.data.exception);
      }
    });

  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="container" style={{ marginTop: '100px', }}>
        <div className="row mt-3" style={{ marginBottom: '100px' }}>
          <div className="col-md-12 mb-4">
            <Card className={`${style['card-login']}`}>
              <div className="p-4 text-center">
                <img src="/imgs/circle-logo.svg" alt="login logo" width="20%" className="mb-3" />
                <div>
                  <h5 className="card-title"><strong>Perhatian</strong></h5>
                  <p className="card-text">Bagi Cabang yang akan mendaftarkan pesertanya silahkan mendaftarkannya
                    melalui sistem ini.</p>
                </div>

                {
                  validation.message && (
                    <div className="alert alert-danger">
                      {validation.message}
                    </div>
                  )
                }
                <form onSubmit={loginHandler} className="mt-4">
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
            </Card>
          </div>
        </div>
      </div >
    </>
  );
}

export default Login;