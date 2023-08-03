import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { logout } from '../../features/auth/authSlice'

import {
  LogoutBtn,
  NavContainer,
  NavPlaceholder,
} from './HeaderNav.styles'

const HeaderNav = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { auth, isLoggedIn, loading, error } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')  
  }

  return <NavContainer>
    <NavPlaceholder>
      <LogoutBtn onClick={handleLogout}>
        Logout
      </LogoutBtn>
    </NavPlaceholder>
  </NavContainer>
}

export default HeaderNav