import { axiosInstance, authAxiosInstance } from "../instances";

const getAllSeasons = () => {
  return authAxiosInstance.get('/season/all')
}

const EventServices = {
  getAllSeasons
}

export default EventServices