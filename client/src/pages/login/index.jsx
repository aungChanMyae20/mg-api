import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { login } from '../../features/auth/authSlice'

import {
  Container
} from './LoginPage.styles'
import LoginForm from '../../components/forms/loginForm'
import { notifyError } from '../../helpers/notifications'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    isLoggedIn,
    loading: isAuthLoading,
    error: isAuthError,
  } = useSelector((state) => state.auth)

  const handleLogin = async (values) => {
    await dispatch(login(values))
  }

  useEffect(() => {
    const token = localStorage.getItem('auth')

    if (token && isLoggedIn) {
      navigate('/')
    }

  }, [isLoggedIn, isAuthLoading, isAuthError])
  
  return (
    <Container>
      <LoginForm onLogin={handleLogin} />
    </Container>
  )
}

export default LoginPage