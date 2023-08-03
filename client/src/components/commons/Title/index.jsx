import React from 'react'

import {
  TitleContainer,
  TitleDiv,
  ActionBox
} from './Title.styles'

const Title = ({ text, children }) => {
  return <TitleContainer>
      <TitleDiv>{text}</TitleDiv>
      {children && <ActionBox>{children}</ActionBox>}
    </TitleContainer>
}

export default Title