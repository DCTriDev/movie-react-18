import React, { useLayoutEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import logo from '@assets/images/logo.png'
import { MAX_WIDTH_MOBILE } from '@config/device.config'
import UserNav from './userNav/UserNav'
import SearchBox from './searchBox/SearchBox'

function Navbar() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= MAX_WIDTH_MOBILE)

  const handleResize = () => {
    if (window.innerWidth < 992) {
      setIsDesktop(false)
    } else {
      setIsDesktop(true)
    }
  }

  const handleScroll = () => {
    if (window.scrollY > 0) {
      document.querySelector('.navbar').classList.add('navbar-scrolled')
    } else {
      document.querySelector('.navbar').classList.remove('navbar-scrolled')
    }
  }

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (isDesktop) return (
    <div className='navbar flex justify-between items-center lg:px-8 px-2 py-2 bg-black w-full'>
      <div className='space-x-3'>
        <NavLink to={process.env.REACT_APP_LINK_HOME}>
          <img src={logo} alt='logo' className='lg:w-22 lg:h-12 w-12 h-11 cursor-pointer' />
        </NavLink>
        <NavLink to={process.env.REACT_APP_LINK_ALL_CONTENTS}
                 activeStyle={{ color: '#995AFF' }}
                 style={{ color: 'white' }}
        >
          All contents
        </NavLink>
        <NavLink to={process.env.REACT_APP_LINK_NEWS}
                 activeStyle={{ color: '#995AFF' }}
                 style={{ color: 'white' }}
        >
          News
        </NavLink>
      </div>
      <SearchBox />
      <UserNav isDesktop={isDesktop} />
    </div>
  )

  return (
    <div className='navbar flex justify-between items-center lg:px-8 px-2 py-2 bg-black w-full'>
      <div className='space-x-3'>
        <NavLink to={process.env.REACT_APP_LINK_HOME}>
          <img src={logo} alt='logo' className='lg:w-22 lg:h-12 w-12 h-11 cursor-pointer' />
        </NavLink>
      </div>
      <SearchBox />
      <UserNav isDesktop={isDesktop} />
    </div>
  )
}

export default React.memo(Navbar)
