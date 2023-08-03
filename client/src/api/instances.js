import axios from 'axios'
import { decryptUserInfo, encryptUserInfo, revokeUserInfo } from '../helpers/utils'
import { notifyError } from '../helpers/notifications'

const configuration = {
  baseURL: 'http://localhost:3003/api',
  headers: {
    'Content-Type': 'application/json'
  }
}

const axiosInstance = axios.create(configuration)
const authAxiosInstance = axios.create(configuration)

const getToken = async () => {
  const authInfo = decryptUserInfo('auth');
  return authInfo ? `Bearer ${authInfo}` : null
}

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken()
    if (token) {
      config.headers.Authorization = token
    }

    return config
  }
)

let isRefreshing = false
let failedRequests = []

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const refreshToken = decryptUserInfo('refreshToken')
    console.log('refreshtoken', refreshToken)
    console.log('error error', error)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry && 
      refreshToken
    ) {
      if (!isRefreshing) {
        isRefreshing = true

        try {
          const response = await authAxiosInstance.post('/auth/refresh-token', {
            refreshToken
          })
          const newAccessToken = response.data.accessToken
          encryptUserInfo(newAccessToken, refreshToken)
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          originalRequest._retry = true
          return axiosInstance(originalRequest)
        } catch (refreshError) {
          const { status, data } = refreshError.response
          if ( status === 401 ) {
            notifyError(data.message)
          } else {
            notifyError("Error refreshing token")
          }
          revokeUserInfo()
        } finally {
          isRefreshing = false
        }

        const retryOriginalRequest = new Promise((resolve) => {
          failedRequests.push({ resolve })
        })

        return retryOriginalRequest
      }
    }

    return Promise.reject(error)
  }
)

export {
  authAxiosInstance,
  axiosInstance
}