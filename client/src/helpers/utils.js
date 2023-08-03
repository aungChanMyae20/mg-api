import AES from 'crypto-js/aes'
import CryptoJS from 'crypto-js'
import { KEY } from './consts'

export const encryptUserInfo = (token, refreshToken) => {
  const authDataForLocalStorage = AES.encrypt(JSON.stringify(token), KEY)
  const authRefreshToken = AES.encrypt(JSON.stringify(refreshToken), KEY)
  localStorage.setItem('auth', authDataForLocalStorage.toString())
  localStorage.setItem('refreshToken', authRefreshToken.toString())
}

export const decryptUserInfo = (info) => {
  const authData = localStorage.getItem(info)?.toString()
  if (authData) {
    const decryptedAuthData = AES.decrypt(authData, KEY)
    return JSON.parse(decryptedAuthData?.toString(CryptoJS.enc.Utf8))
  }
  return null
}

export const revokeUserInfo = () => {
  localStorage.removeItem('auth')
  localStorage.removeItem('refreshToken')
  window.location.href = '/login'
  // return <Navigate to='/login' />
}