import React from 'react'
import { Field, ErrorMessage } from 'formik'

import { InputWrapper } from './Input.styles'

const Input = (props) => {
  const {
    label,
    name,
    type = 'text',
    value,
    hasError,
    ...rest
  } = props

  return (
    <InputWrapper className={hasError && 'error'}>
      <label htmlFor={name}>{!hasError ? label : <ErrorMessage name={name} component="p" />}</label>
      { 
        (type === 'text' || type === 'password') ? <Field type={type} value={value} id={name} name={name} {...rest} />
        :
        <Field as={type} value={value} id={name} name={name} {...rest} />
      }
    </InputWrapper>
  )
}

export default Input