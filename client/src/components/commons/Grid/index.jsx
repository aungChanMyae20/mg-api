import React from 'react'
import {
  LayoutDiv,
  RowDiv,
  ColDiv
} from './Grid.styles'

const Layout = ({ children }) => {
  return <LayoutDiv>{children}</LayoutDiv>
}

const Row = ({ children }) => {
  return <RowDiv>{children}</RowDiv>
}

const Col = ({ size = 12, children }) => {
  return <ColDiv size={size}>{children}</ColDiv>
}

export { Layout, Row, Col }