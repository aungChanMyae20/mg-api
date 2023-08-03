import React from 'react'
import { ButtonEl } from './Button.styles'

const Button = ({ onClick, children}) => {
  return <ButtonEl onClick={onClick}>{children}</ButtonEl>
}

export default Button