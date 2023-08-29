import React from 'react'
import {
  ModalActions,
  ModalBackground, 
  ModalBody, 
  ModalClose, 
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from './modal.styles'

const Modal = ({
  title,
  onClose,
  actions,
  handleActions,
  actionTexts = { ok: 'Ok', cancel: 'Cancel'},
  children
}) => {

  return <ModalBackground>
    <ModalContainer>
      <ModalBody>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalClose>
            <button type="button" onClick={() => onClose(false)}>
              <ion-icon name="close-circle-sharp"></ion-icon>
            </button>
          </ModalClose>
        </ModalHeader>
        <ModalContent>
          {children}
        </ModalContent>
        {
          actions &&
          <ModalActions>
            <button type="button" onClick={() => handleActions(false)}>{actionTexts.cancel}</button>
            <button type="button" onClick={() => handleActions(true)}>{actionTexts.ok}</button>
          </ModalActions>
        }
      </ModalBody>
    </ModalContainer>
  </ModalBackground>
}

export default Modal
