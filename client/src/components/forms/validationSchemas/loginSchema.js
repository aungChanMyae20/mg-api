import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  name: yup.string().required('Username is required.'),
  pin: yup.string().required('Pin is required')
})