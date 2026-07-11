import axios, { AxiosInstance } from 'axios'
import { API_BASE_URL, STORAGE_KEYS } from './constants'

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
          : null

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Response interceptor
  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response?.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
          localStorage.removeItem(STORAGE_KEYS.USER)
          // Redirect to login (will be handled by middleware)
        }
      }

      return Promise.reject(error)
    }
  )

  return instance
}

export const axiosInstance = createAxiosInstance()
