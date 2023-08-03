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

  return <>
    {
      link ?
      <CardDiv>
        <NavLink to={link}>
          <Content />
        </NavLink>
      </CardDiv>
      :
      <CardDiv>
        <Content />
      </CardDiv>
    }
  </>
}

export default Card