import axios from 'axios';

function authRest() {
  const urlGroup = 'v1/auth';

  function login(payload) {
    return axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND + urlGroup}/login`, payload);
  }

  return { login };
}

export default authRest;