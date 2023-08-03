import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AlbumForm from '../../components/forms/albumForm'
import { createAlbum, updateAlbum, getAlbumByTag } from '../../features/album/albumSlice'
import Breadcrumb from '../../components/commons/Breadcrumb'

const AlbumFormPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { albumTag } = useParams()
  const { data } = useSelector((state) => state.album)

  const [albumData, setAlbumData] = useState(null)
  const [pageTitle, setPageTitle] = useState("Create Album")

  const createNewAlbum = async (values) => {
    const response = await dispatch(createAlbum({
      ...values,
      seasonID: data.seasonID,
    }))

    const albumTagName = response?.payload
    navigate(`/album/${albumTagName}`)
  }

  const albumUpdate = async (values) => {
    const response = await dispatch(updateAlbum(values))
    const updatedAlbum = response.payload
    setAlbumData(updatedAlbum)
  }

  const onSubmit = (values) => {
    if (!values._id) {
      createNewAlbum(values)
    } else {
      albumUpdate(values)
    }
  }

  const getAlbumByAlbumTag = async (albumTag) => {
    const response = await dispatch(getAlbumByTag(albumTag))
    
    if ( response?.payload ) {
      const { data } = response.payload
      setAlbumData(data)
    }
  }

  useEffect(() => {
    if (albumTag) {
      getAlbumByAlbumTag(albumTag)
      setPageTitle(albumTag.replaceAll('_', ' '))
    }
  }, [albumTag])

  const breadcrumb = [
    {
      name: 'events',
      link: '/events'
    },
    {
      name: data.season ? `${data.season}` : null,
      link: data.season ? `/events/${data.season.replaceAll(' ', '_').toLowerCase()}` : null
    },
    {
      name: pageTitle,
    }
  ]

  return <div>
    <Breadcrumb breadcrumbList={breadcrumb} />
    <h4 style={{ textTransform: 'capitalize' }}>{pageTitle}</h4>

    <AlbumForm
      data={{
        seasonID: data?.seasonID
      }}
      albumData={albumData}
      onSubmit={onSubmit}
    />
  </div>
}

export default AlbumFormPage