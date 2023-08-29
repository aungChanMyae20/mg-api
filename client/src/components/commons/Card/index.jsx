import React from 'react'
import { NavLink } from 'react-router-dom'

import { CardDiv, Title } from './Card.styles'

const Card = ({title, link, children}) => {

  const Content = () => {
    return <>
      {title && <Title>{title}</Title>}
      <div>
        {children}
      </div>
    </>
  }

  return (
    <CardDiv>
      {
        title && 
          link ? <NavLink to={link}><Title>{title}</Title></NavLink>
          :
          <Title>{title}</Title>
      }
      {children}
    </CardDiv>
  )
}

export default Card