import axios from 'axios';
import store from '../store';
import router from '../router';
import axiosRetry from 'axios-retry';
import { mapMutations } from 'vuex';

const { setAccessToken, clearUserSession } = mapMutations(['setAccessToken', 'clearUserSession']);

export const Axios = axios.create({
  baseURL: 'http://localhost:3000',
})

Axios.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  let res = error.response

  if (res.status === 401) {
    try {
      const res = await Axios
        .post('/auth/refresh', {}, {
          headers: {
            Authorization: `Bearer ${store.state.refreshToken}`
          }
        });
      setAccessToken(res.data.accessToken);
    } catch (e) {
      clearUserSession()
      router.push('/sign-in')
      return
    }
  }

  return Promise.reject(error)
})

axiosRetry(Axios, { 
  retries: 2,
  retryCondition: function(error) {
    let res = error.response

    return res.status === 401
  } 
})