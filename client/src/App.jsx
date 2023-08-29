import React from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes/routes'
import styled from 'styled-components'

const Section = styled.section`
  display: grid;
  min-height: 100vh;
  background-color: var(--background-color);
`

const App = () => {
  const routing = useRoutes(routes)

  return (
    <Section>
      {routing}
    </Section>
  );
}

export default App;
