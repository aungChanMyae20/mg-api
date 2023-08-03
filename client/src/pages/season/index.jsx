import React, { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { deleteAlbum, getAlbums } from '../../features/album/albumSlice'

import { Layout, Row, Col } from '../../components/commons/Grid'
import Title from '../../components/commons/Title'
import Card from '../../components/commons/Card'
import Button from '../../components/commons/Button'
import Breadcrumb from '../../components/commons/Breadcrumb'
import { notifyError } from '../../helpers/notifications'

const SeasonPage = () => {
  const { eventTag } = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading } = useSelector((state) => state.album)

  const [ error, setError ] = useState(false)
  const [ errorText, setErrorText ] = useState(null)

  const getSeasonInfo = async () => {
    const response = await dispatch(getAlbums(eventTag))
    if (response && response?.payload.status === 403) {
      const { message } = response.payload
      setError(true)
      setErrorText(message)
    }
  }

  useEffect(() => {
    eventTag && getSeasonInfo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    (error && errorText) && notifyError(errorText)
  }, [error, errorText])

  const handleClick = () => {
    navigate(`/events/${eventTag}/add`) 
  }

  const handleRemoveAlbum = async (albumID) => {
    await dispatch(deleteAlbum({ eventTag, albumID }))
  }

  const breadcrumb = [
    {
      name: 'events',
      link: '/events'
    },
    {
      name: eventTag.replaceAll('_', ' ')
    }
  ]

  return <>
    <Breadcrumb breadcrumbList={breadcrumb} />
    <Title text={data?.season || 'Albums'}>
      <Button onClick={() => handleClick()}>Add new album</Button>
    </Title>
    <Layout>
      <Row>
        {
          data ?
          data.albums?.map((album, i) => <Col size={4} key={`${album.name}_${i + 1}`}>
            <Card
              title={`${album.number}. ${album.name}`}
              link={`/album/${album.albumTag}`}
            >
              <button type="button" onClick={(e) => {
                console.log('clicked')
                e.preventDefault()
                handleRemoveAlbum(album._id)
              }}
              >Delete</button>
            </Card>
          </Col>)
          :
          loading ? 
          <div>Loading...</div>
          :
          <Card>
            No album found
          </Card>
        }
      </Row>
    </Layout>
  </>
  
}

export default SeasonPage