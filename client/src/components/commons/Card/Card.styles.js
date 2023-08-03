import styled from 'styled-components'

export const CardDiv = styled.div`
  margin: 10px;
  padding: 12px 18px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);

  > a {
    text-decoration: none;
  }
`

export const Title = styled.h5`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--font-light);
  margin-bottom: 20px;
`