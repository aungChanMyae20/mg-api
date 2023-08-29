import styled from 'styled-components'

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  z-index: 7;
  overflow: auto;
`

export const ModalContainer = styled.div`
  margin: auto;
  max-width: 400px;
  padding: 15px;
  border-radius: 8px;
  background-color: var(--background-color);
  position: relative;
`

export const ModalBody = styled.div`
  padding: 5px;
`

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0 15px 0;
`

export const ModalTitle = styled.h3`
  margin: 0;
  text-transform: capitalized;
  margin-right: 4rem;
`

export const ModalClose = styled.div`
  position: absolute;
  top: 15px;
  right: 10px;

  & > button {
    font-size: 1.6rem;
    background: transparent;
    border: 0;
    cursor: pointer;
  }
`

export const ModalContent = styled.div`
  padding: 10px 0;
  margin-bottom: 10px;
`

export const ModalActions = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: end;
`