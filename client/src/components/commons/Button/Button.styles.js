import styled from 'styled-components'

export const ButtonEl = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 8px;
  background-color: var(--secondary-color);
  color: var(--font-light);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  :hover {
    box-shadow: rgba(59, 40, 40, 0.44) 0px 0px 4px -1px;
    transform: translate3d(0px, 0px, 2px);
    scale: 1.01;
  }
`