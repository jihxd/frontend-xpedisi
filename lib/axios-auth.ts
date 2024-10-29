import axios from 'axios'

const $axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

$axiosAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      'Request Error: ',
      error?.response?.data?.message || error?.message,
    )
    return Promise.reject(error)
  },
)

export default $axiosAuth
