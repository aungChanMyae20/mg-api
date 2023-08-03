import styled from 'styled-components'

export const BreadcrumbContainer = styled.div`
  padding: 10px 20px 10px 0;
`

export const BreadcrumbList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: flex;
`

export const BreadcrumbItem = styled.li`
  padding-right: 20px;
  position: relative;

  a {
    color: inherit;
    text-decoration: none;
  }

  p {
    margin: 0;
    text-transform: capitalize;
  }

  :after {
    content: "";
    position: absolute;
    right: 7px;
    top: 6px;
    width: 7px;
    height: 7px;
    border-top: 1px solid var(--font-light);
    border-right: 1px solid var(--font-light);
    transform: rotate(45deg);
  }

  :last-child p {
    font-weight: 600;
  }

  :last-child::after {
    display: none;
  }
`