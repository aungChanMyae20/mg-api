import styled from 'styled-components'

export const NavContainer = styled.div`
  height: 80px;
  `
    
export const NavPlaceholder = styled.nav`
  position: fixed;
  top: 0;
  max-height: 80px;
  padding: 10px;
  width: calc(100% - 20px);
  background: #CBD4CF;
  box-shadow: rgb(142, 142, 142) 0px 3px 7px 2px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  display: flex;
  justify-content: end;
  z-index: 9999;
`

export const LogoutBtn = styled.button`
  border: none;
  outline: 0;
  padding: 10px 20px;
  margin-right: 30px;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s linear;
  border-radius: 8px;
  :hover {
    box-shadow: 0px 0px 8px -1px rgb(142, 142, 142);
  }
`