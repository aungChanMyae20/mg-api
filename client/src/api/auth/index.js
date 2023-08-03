import { authAxiosInstance } from "../instances"

const login = (values) => {
  return authAxiosInstance.post('/auth/login', values)
}

const AuthServices = {
  login
}

export default AuthServices