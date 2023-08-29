import { axiosInstance, authAxiosInstance } from "../instances";

const getAllSeasons = () => {
  return authAxiosInstance.get('/season/all')
}

const saveEvent = (values) => {
  return axiosInstance.post('/season/event', values)
}

const EventServices = {
  getAllSeasons,
  saveEvent
}

export default EventServices