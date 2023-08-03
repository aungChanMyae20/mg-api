import React from 'react'
import { Link } from 'react-router-dom'

import {
  BreadcrumbContainer, BreadcrumbItem, BreadcrumbList
} from './Breadcrumb.styles'

const Breadcrumb = ({ breadcrumbList }) => {
  return <BreadcrumbContainer>
    <BreadcrumbList>
      {
        breadcrumbList.map((item, index) => 
          item.link ? 
          <BreadcrumbItem key={`${item.name}_${index}`}>
            <Link to={item.link}>
              <p>{item.name}</p>
            </Link>
          </BreadcrumbItem>
          :
          <BreadcrumbItem key={`${item.name}_${index}`}>
            <p>{item.name}</p>
          </BreadcrumbItem>
        )
      }
    </BreadcrumbList>
  </BreadcrumbContainer>
}

export default Breadcrumb