import { Navigate, Outlet } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

import PrivateLayout from '../layouts/PrivateLayout'
import PublicLayout from '../layouts/PublicLayout'

import LoginPage from '../pages/login'
import DashboardPage from '../pages/dashboard'
import EventsPage from '../pages/events'
import SeasonPage from '../pages/season'
import AlbumFormPage from '../pages/albumForm'

const routes = [
  {
    path: '/',
    element: <PrivateRoute component={PrivateLayout} />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" />
      },
      {
        path: '/dashboard',
        element: <DashboardPage />
      },
      {
        path: '/events',
        element: <EventsPage />
      },
      {
        path: '/events/:eventTag',
        element: <SeasonPage />
      },
      {
        path: '/events/:eventTag/add',
        element: <AlbumFormPage />
      },
      {
        path: '/album/:albumTag',
        element: <AlbumFormPage />
      }
    ]
  },
  {
    path: '/',
    element: <PublicRoute component={PublicLayout} />,
    children: [
      {
        path: '/',
        element: <Navigate to="/login" />
      },
      {
        path: 'login',
        element: <LoginPage />
      }
    ]
  },
  {
    path: '*',
    element: <div>Page not found</div>
  }
]

export default routes;