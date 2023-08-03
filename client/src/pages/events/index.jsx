import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getSeasons } from '../../features/event/eventSlice'

import { Layout, Row, Col } from '../../components/commons/Grid'
import Title from '../../components/commons/Title'
import Card from '../../components/commons/Card'
import Button from '../../components/commons/Button'

const EventsPage = () => {
  const dispatch = useDispatch()

  const { seasons, loading } = useSelector((state) => state.event)

  const getAllSeasons = async () => {
    await dispatch(getSeasons())
  }

  useEffect(() => {
    getAllSeasons()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <Title text="Events" />
    <Layout>
      <Row>
        {
          !loading ?
          <Col>
            {
              seasons?.map((season, index) => <Card key={`${season.name}_${index + 1}`} title={season.name} link={`/events/${season.eventTag}`}>
                <div>Ends In: {season.endDate}</div>
              </Card>
              )
            }
          </Col>
          :
          <Col>
            <div>Loading...</div>
          </Col>
        }
      </Row>
    </Layout>
  </>
}

export default EventsPage