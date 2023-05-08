import Cookies from 'js-cookie';
import authRest from '../rest/auth';

function useUser() {
  const rest = authRest();

  async function login(payload) {
    //send data to server
    await rest.login(payload)
      .then((response) => {
        const token = response['data']['data']['access_token'];
        setLoginData(token);
        // Redirect to dashboard
        // Router.push('/dashboard');
      });
    // .catch((error) => {

    //   error.response.data.exception.message = 'Username dan Password salah!';
    //   //assign error to state "validation"
    //   setValidation(error.response.data.exception);
    // });
  }

  function setLoginData(token) {
    // Set token on cookies
    Cookies.set('token', token);
  }

  function delLoginData() {
    Cookies.del('token');

  }

  return { login, setLoginData, delLoginData };
}

export { useUser };