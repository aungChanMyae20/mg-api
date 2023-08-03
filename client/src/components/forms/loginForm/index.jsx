import React from 'react'
import { Formik, Form } from 'formik'
import bcrypt from 'bcryptjs'

import { loginSchema } from '../validationSchemas/loginSchema'

const LoginForm = ({
  onLogin
}) => {
  const initialValues = {
    name: '',
    pin: ''
  }
  const Input = React.lazy(() => import('../../formComponents/input'))

  return (
    <div className='form-wrapper'>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={onLogin}
      >
        <React.Suspense fallback={<div>Loading...</div>}>
          <Form>
            <div>
              <div>
                <Input label="User name" type="text" name="name" />
              </div>
              <div>
                <Input label="Pin" type="password" name="pin" />
              </div>
              <div>
                <button type="submit">Login</button>
              </div>
            </div>
          </Form>
        </React.Suspense>
      </Formik>
    </div>
  )
}

export default LoginForm