import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'

import Navbar from '@components/navbar/Navbar'
import Footer from '@components/footer/Footer'

function MainTemplate({ Component, ...restRoute }) {
  useEffect(() => window.scrollTo(0, 0))

  return (
    <Route
      {...restRoute}
      render={(propsRoute) => (
        <>
          <Navbar />
          <Component {...propsRoute} />
          <Footer />
        </>
      )}
    />
  )
}

export default MainTemplate
