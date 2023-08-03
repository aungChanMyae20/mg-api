import React, { useState, useEffect } from 'react'
import { Formik, FieldArray, getIn } from 'formik'

import { albumSchema } from '../validationSchemas/albumSchema'
import { 
  AddBtn,
  AddBtnWrapper,
  CardFormWrapper,
  CreateBtn,
  CreateBtnWrapper,
  RemoveBtmContainer,
  RemoveBtn,
} from './albumForm.styles'
import { Row, Col } from '../../commons/Grid'
import Input from '../../formComponents/input'
import Checkbox from '../../formComponents/checkbox'

const AlbumForm = ({
  data,
  albumData = null,
  onSubmit
}) => {
  const { seasonID } = data
  const cardObj = {
    name: '',
    number: '',
    stars: '',
    tradable: true
  }

  const [ initialValues, setInitialValues ] = useState({
    name: '',
    seasonID,
    number: '',
    rewards: '',
    cards: [cardObj]
  })
  const [btnText, setBtnText] = useState("Create album")

  useEffect(() => {
    if (albumData) {
      setInitialValues({
        ...albumData,
        seasonID
      })
      setBtnText("Update album")
    }
  }, [albumData])

  const handleSubmit = (values) => {
    onSubmit(values)
  }

  return <div>
    <Formik
      initialValues={initialValues}
      validationSchema={albumSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        handleBlur,
      }) => (
        <form onSubmit={handleSubmit}>
          <>
            <Row>
              <Col size={6}>
                <Input 
                  label="Album name"
                  name="name" 
                  value={values.name} 
                  onBlur={handleBlur}
                  hasError={touched.name && Boolean(errors.name)}
                />
                <Input 
                  label="Album Number" 
                  name="number" 
                  value={values.number} 
                  onBlur={handleBlur}
                  hasError={touched.number && Boolean(errors.number)}
                />
              </Col>
              <Col size={6}>
                <Input type="textarea" label="Rewards" name="rewards" value={values.rewards} />
              </Col>
            </Row>
                <FieldArray name="cards">
                  {({ remove, push }) => (
                    <Row>
                        {
                          values?.cards?.length > 0 &&
                          values.cards.map((card, index) => {
                            const cardNameField = `cards[${index}].name`
                            const cardNumberField = `cards[${index}].number`
                            const cardStarsField = `cards[${index}].stars`
                            const cardTradableField = `cards[${index}].tradable`

                            const cardNameTouched = getIn(touched, cardNameField)
                            const cardNumberTouched = getIn(touched, cardNumberField)
                            const cardStarsTouched = getIn(touched, cardStarsField)
                            const cardTradableTouched = getIn(touched, cardTradableField)

                            const cardNameError = getIn(errors, cardNameField)
                            const cardNumberError = getIn(errors, cardNumberField)
                            const cardStarsError = getIn(errors, cardStarsField)
                            const cardTradableError = getIn(errors, cardTradableField)
        
                            return <Col size={3} key={`${seasonID}_${index + 1}`}>
                              <CardFormWrapper>
                              { (index >= 1 || values.cards.length > 1) && 
                                  <RemoveBtmContainer>
                                    <RemoveBtn 
                                      type="button" 
                                      onClick={() => remove(index)}
                                    >
                                      <ion-icon 
                                        style={{ 
                                          fontSize: '1.8rem', 
                                          color: `#ED6557` 
                                        }} 
                                        name="close-circle-outline"
                                      ></ion-icon>
                                    </RemoveBtn>
                                  </RemoveBtmContainer>
                              }
                                <div>
                                  <Input 
                                    label="Card Name" 
                                    name={cardNameField} 
                                    value={card.name} 
                                    onBlur={handleBlur}
                                    hasError={cardNameTouched && Boolean(cardNameError)}
                                  />
                                </div>
                                <div>
                                  <Input 
                                    label="Card Number" 
                                    name={cardNumberField} 
                                    value={card.number} 
                                    onBlur={handleBlur}
                                    hasError={cardNumberTouched && Boolean(cardNumberError)}
                                  />
                                </div>
                                <div>
                                  <Input 
                                    label="Stars" 
                                    name={cardStarsField} 
                                    value={card.stars} 
                                    onBlur={handleBlur}
                                    hasError={cardStarsTouched && Boolean(cardStarsError)}
                                  />
                                </div>
                                <div>
                                  <Checkbox name={cardTradableField} label="Tradable" />
                                </div>
                              </CardFormWrapper>
                            </Col>
                          })
                        }
                        <AddBtnWrapper>
                          <AddBtn type="button" onClick={() => push(cardObj)}>
                            <ion-icon name="add-circle-outline" style={{ color: 'var(--font-light)', fontSize: '4rem' }}></ion-icon>
                          </AddBtn>
                        </AddBtnWrapper>
                    </Row>
                    
                  )}
                </FieldArray>
            <Row>
              <Col>
                <CreateBtnWrapper>
                  <CreateBtn type="submit">{btnText}</CreateBtn>
                </CreateBtnWrapper>      
              </Col>
            </Row>
          </>
        </form>
      )}
    </Formik>
  </div>
}

export default AlbumForm