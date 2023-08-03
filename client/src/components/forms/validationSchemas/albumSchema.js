import * as yup from 'yup'

export const albumSchema = yup.object().shape({
  name: yup.string().required('Album name is required.'),
  number: yup.string().required('Album number is required.'),
  cards: yup.array()
    .of(yup.object().shape({
      name: yup.string().required('Name is required'),
      number: yup.string().required('Number is required.'),
      stars: yup.string().required('No. of star is required'),
    }))
})