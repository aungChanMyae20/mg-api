import { toast } from 'react-toastify'

const config = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored'
}

export const notifySuccess = ( title ) => toast.success(title, config)

export const notifyError = ( title ) => toast.error(title, config)

export const notifyInfo = ( title ) => toast.info(title, config)