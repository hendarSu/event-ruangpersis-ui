import Cookies from 'js-cookie';
import authRest from '../rest/auth';

function useAuth() {
  const rest = authRest();

  function login(payload) {
    return rest.login(payload)
      .then((response) => {
        const token = response['data']['data']['access_token'];
        setLoginData(token);
      });
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

export default useAuth;