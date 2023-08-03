import React from 'react'
import { Outlet } from 'react-router-dom'
import Wrapper from '../../components/commons/Wrapper'
import HeaderNav from '../HeaderNav'
import FooterNav from '../FooterNav'

const PrivateLayout = () => {
  return (
    <div id="private-layout">
      <HeaderNav />
      <Wrapper>
        <Outlet />
      </Wrapper>
      <FooterNav />
    </div>
  )
}

export default PrivateLayout