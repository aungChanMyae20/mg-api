import styled from 'styled-components'

export const NavContainer = styled.div`
  height: 80px;
  width: 100%;
  display: grid;
  justify-items: center;
  position: fixed;
  bottom: 0;
`

export const NavPlaceholder = styled.nav`
  bottom: 0;
  padding: 20px 0;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2);
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
`
export const List = styled.ul`
  list-style-type: none;
  display: flex;
  padding: 0;
  margin: 0;

  li:last-child a::after {
    display: none;
  }
`

export const Item = styled.li`
  font-weight: 500;

  a {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    text-decoration: none;
    color: inherit;

    ::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      border-right: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 50%;
      box-shadow: 0 0 1rem 0 rgba(255, 255, 255, 0.15)
      ;
    }

    :visited, :active {
      color: inherit;
    }
  }
`

export const Link = styled.a`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  text-decoration: none;
  color: inherit;

  ::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    border-right: 1px solid #b3b6b2;
    border-radius: 50%;
    box-shadow: 0 0 4px 2px #bababa;
  }

  :visited, :active {
    color: inherit;
  }
`

export const Icon = styled.div`
  margin-bottom: 10px;
`

export const Text = styled.div`
  font-size: 12px;
`