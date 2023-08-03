import React from 'react'
import { NavLink } from 'react-router-dom'

import {
  NavContainer,
  NavPlaceholder,
  Link,
  List,
  Item,
  Icon,
  Text,
} from './FooterNav.styles'

const FooterNav = () => {
  return (
    <NavContainer>
      <NavPlaceholder>
        <List>
          <Item>
            <NavLink to="/events">
              <Icon><ion-icon name="albums-outline" style={{ fontSize: 24 }}></ion-icon></Icon>
              <Text>Events</Text>
            </NavLink>
          </Item>
          <Item>
            <NavLink to="/dashboard">
              <Icon><ion-icon name="grid-outline" style={{ fontSize: 24 }}></ion-icon></Icon>
              <Text>Home</Text>
            </NavLink>
          </Item>
          <Item>
            <Link href="/manage">
              <Icon><ion-icon name="file-tray-stacked-outline" style={{ fontSize: 24 }}></ion-icon></Icon>
              <Text>Manage</Text>
            </Link>
          </Item>
        </List>
      </NavPlaceholder>
    </NavContainer>
  )
}

export default FooterNav