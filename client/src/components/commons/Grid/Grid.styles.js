import styled from 'styled-components'

export const LayoutDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const RowDiv = styled.div`
  flex: 1;
  display: flex;
  margin: -10px;
  flex-wrap: wrap;
`

export const ColDiv = styled.div`
  box-sizing: border-box;
  padding: 10px;
  flex: 0 0 ${props => 100 / (12 / props.size)}%;
  max-width: ${props => 100 / (12 / props.size)}%;
`