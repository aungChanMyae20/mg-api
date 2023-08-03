import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ component: RouteComponent }) => {

  return <RouteComponent />
}

export default PublicRoute