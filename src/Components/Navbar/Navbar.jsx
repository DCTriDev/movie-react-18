import React, {useLayoutEffect, useState} from 'react'
import UserNav from './UserNav/UserNav'
import {NavLink} from 'react-router-dom'
import logo from '../../Assets/Images/logo.png'
import SearchBox from './SearchBox/SearchBox'

function Navbar() {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992)
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

    return (
        <div className='navbar flex justify-between items-center lg:px-8 px-2 py-2 bg-black w-full'>
            <div className='space-x-3'>
                <NavLink to={process.env.REACT_APP_LINK_HOME}>
                    <img src={logo} alt='logo' className='lg:w-22 lg:h-12 w-12 h-11 cursor-pointer' />
                </NavLink>
                {isDesktop ? (
                    <>
                        <NavLink to={process.env.REACT_APP_LINK_ALL_CONTENTS} activeStyle={{color: '#995AFF'}}
                                 style={{color: 'white'}}>
                            All contents
                        </NavLink>
                        <NavLink to={process.env.REACT_APP_LINK_NEWS} activeStyle={{color: '#995AFF'}}
                                 style={{color: 'white'}}>
                            News
                        </NavLink>
                    </>
                ) : <></>}
            </div>
            <SearchBox />
            <UserNav isDesktop={isDesktop} />
        </div>
    )
}

export default React.memo(Navbar)
