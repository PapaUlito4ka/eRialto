import axios from 'axios'
import store from '../store'
import axiosRetry from 'axios-retry'

const BASE_URL = 'http://localhost:3000'

function clearUserSession() {
  store.state.user = store.state.accessToken = store.state.refreshToken = null
  localStorage.clear()
}

function setAccessToken(token) {
  store.state.accessToken = token
  localStorage.setItem('accessToken', token)
}

export const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${store.state.accessToken}`
  }
})

Axios.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  let res = error.response

  if (error.config && res && res.status === 401) {
    try {
      const res = await axios.create({ baseURL: BASE_URL })
        .post('/auth/refresh', {}, {
          headers: {
            Authorization: `Bearer ${store.state.refreshToken}`
          }
        })
      setAccessToken(res.data.access_token)
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
  retryCondition: function (error) {
    return error.response.status === 401
  },
  retryDelay: (retryCount) => {
    return 50
  },
})