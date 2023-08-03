import { Outlet } from 'react-router-dom'

import { Wrapper } from './PublicLayout.styles'

const PublicLayout = () => {

  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  )
}

export default PublicLayout