import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { getSeasons, createEvent } from '../../features/event/eventSlice'

import { Layout, Row, Col } from '../../components/commons/Grid'
import Title from '../../components/commons/Title'
import Card from '../../components/commons/Card'
import Button from '../../components/commons/Button'
import { useNavigate } from 'react-router-dom'
import Modal from '../../components/commons/modal'
import EventForm from '../../components/forms/eventForm'

const EventsPage = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const { seasons, loading } = useSelector((state) => state.event)

  const getAllSeasons = async () => {
    await dispatch(getSeasons())
  }

  const addEvent = () => {
    setShowForm(true)
  }

  useEffect(() => {
    getAllSeasons()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const save = async (values) => {
    console.log('date', values.endDate)
    const res = await dispatch(createEvent(values))
    if (res) {
      setShowForm(false)
      const { success } = res.payload
      success && await dispatch(getSeasons())
    }
  }

  const onEdit = (values) => {
    console.log('edit form', values)
    setFormData(values)
    setShowForm(true)
  }

  useEffect(() => {
    !showForm && setFormData(null)
  }, [showForm])

  return <>
    <Title text="Events">
      <Button onClick={() => addEvent()}>
        Add new event
      </Button>
    </Title>
    <Layout>
      <Row>
        {
          !loading ?
          <Col>
            {
              seasons?.map((season, index) => <Card 
                key={`${season.name}_${index + 1}`} 
                title={season.name} 
                link={`/events/${season.eventTag}`}
                >
                  <div>
                    <div>Ends In: {season.endDate}</div>
                    <div>
                      <button type="button" onClick={() => onEdit(season)}>Edit</button>
                    </div>
                  </div>
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
    {
      showForm && <Modal
        title="Add New Event"
        onClose={setShowForm}
      >
        <EventForm handleAction={save} values={formData} />
      </Modal>
    }
  </>
}

export default EventsPage