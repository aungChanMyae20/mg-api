import * as yup from 'yup'

export const eventSchema = yup.object().shape({
  name: yup.string().required('Event name is required.'),
  endDate: yup.string().required('End date is required.')
})