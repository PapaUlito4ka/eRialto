import axios from 'axios';
import store from '../store';
import axiosRetry from 'axios-retry';


function clearUserSession() {
  store.state.user = store.state.accessToken = store.state.refreshToken = null;
  localStorage.clear();
}

function setAccessToken(token) {
  state.accessToken = token;
  localStorage.setItem('accessToken', token);
}

export const Axios = axios.create({
  baseURL: 'http://localhost:3000',
})

Axios.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  let res = error.response;

  if (res.status === 401) {
    try {
      const res = await axios.create({ baseURL: 'http://localhost:3000' })
        .post('/auth/refresh', {}, {
          headers: {
            Authorization: `Bearer ${store.state.refreshToken}`
          }
        });
      console.log(res.data);
      setAccessToken(res.data.accessToken);
    } catch (e) {
      console.log(e);
      clearUserSession();
      router.push('/sign-in');
      return;
    }
  }

  return Promise.reject(error)
})

axiosRetry(Axios, {
  retries: 2,
  retryCondition: function (error) {
    let res = error.response

    return res.status === 401
  }
})