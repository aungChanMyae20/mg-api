import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { notifyError } from '../../helpers/notifications'

const PrivateRoute = ({ component: RouteComponent }) => {

  const token = localStorage.getItem('auth')

  if (!token) {
    return <Navigate to="/login" />
  }

  return <RouteComponent />
}

export default PrivateRoute