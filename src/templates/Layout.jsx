import React from 'react'

import Navbar from '@components/navbar/Navbar'

function Layout(Component) {
  return (props) => {
    return (
      <div>
        <Navbar />
        <Component {...props} />
      </div>
    )
  }
}

export default Layout
