import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'

import { eventSchema } from '../validationSchemas/eventSchema'
import dayjs from 'dayjs'

const EventForm = ({
  values,
  handleAction
}) => {
  const initialValues = {
    name: '',
    endDate: ''
  }
  const [initial, setInitial] = useState(values ? values : initialValues)

  useEffect(() => {
    values && setInitial(values)
  }, [values])

  useEffect(() => {
    console.log('initila', initial)
  }, [initial])

  const Input = React.lazy(() => import('../../formComponents/input'))
  const Datepicker = React.lazy(() => import('../../formComponents/datepicker'))
  
  return (
    <div className="form-wrapper">
      <Formik
        initialValues={initial}
        validationSchema={eventSchema}
        onSubmit={(values) => handleAction(values)}
        enableReinitialize
      >
        {({ values, errors, handleSubmit, setFieldValue}) => (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Form>
              <div>
                <div>
                  <Input 
                    label="Event name" 
                    type="text" 
                    name="name"
                    value={values.name}
                    hasError={errors.name}
                  />
                </div>
                <div>
                  <Datepicker 
                    label="End date" 
                    name="endDate"
                    value={dayjs(values.endDate).format('YYYY-MM-DD')}
                    hasError={errors.endDate}
                    setValue={setFieldValue}
                  />
                </div>
                <div>
                  <button type="submit" onClick={handleSubmit}>
                    Add
                  </button>
                </div>
              </div>
            </Form>
          </React.Suspense>
        )
        }
      </Formik>
    </div>
  )
}

export default EventForm
