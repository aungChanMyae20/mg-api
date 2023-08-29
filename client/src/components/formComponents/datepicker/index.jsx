
import { ErrorMessage } from 'formik'

import { DatepickerWrapper } from './Datepicker.styles'

const Datepicker = (props) => {
  const {
    label,
    name, 
    value,
    hasError,
    setValue,
    ...rest
  } = props

  console.log('value)', value)
  
  return (
    <DatepickerWrapper className={hasError ? 'error' : ''}>
      <label htmlFor={name}>
        {!hasError ? label : <ErrorMessage name={name} component="p" />}
      </label>
      <input 
        id={name} 
        name={name} 
        value={value} 
        type="date"
        onChange={(e) => setValue('endDate', e.target.value)}
        {...rest} 
      />
    </DatepickerWrapper>
  )
}

export default Datepicker
