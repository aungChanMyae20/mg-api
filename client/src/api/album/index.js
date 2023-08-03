import { axiosInstance } from "../instances";

const getAlbumsBySeason = (eventTag) => {
  return axiosInstance.get(`/album/albums/${eventTag}`)
}

const getAlbum = (albumTag) => {
  return axiosInstance.get(`/album/album/${albumTag}`)
}

const createAlbum = (data) => {
  return axiosInstance.post(`/album/album`, data)
}

const updateAlbum = (data) => {
  return axiosInstance.put(`/album/album`, data)
}

const removeAlbum = (albumID) => {
  return axiosInstance.delete(`/album/album/${albumID}`)
}


const AlbumServices = {
  getAlbumsBySeason,
  getAlbum,
  createAlbum,
  updateAlbum,
  removeAlbum,
}

export default AlbumServices