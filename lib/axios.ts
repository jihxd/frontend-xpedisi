'use server'

import { auth } from '@/auth'
import axios from 'axios'
import { getCookie } from 'cookies-next'

const $axios = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

$axios.interceptors.request.use(async (config) => {
  // NOTE: get endpoint_process from cookie
  const baseUrl =
    getCookie('endpoint_process') || process.env.NEXT_PUBLIC_API_URL
  config.baseURL = baseUrl

  const session = await auth()
  config.headers.Authorization = `${session?.accessToken || ''}`

  return config
})

$axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error(
      'Request Error: ',
      error?.response?.data?.message || error?.message,
    )
    return Promise.reject(error)
  },
)

export default $axios
