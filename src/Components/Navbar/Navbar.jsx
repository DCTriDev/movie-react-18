import React, {useLayoutEffect} from 'react';
import UserNav from "./UserNav/UserNav";
import {NavLink} from "react-router-dom";
import logo from '../../Assets/Images/logo.png';
import SearchBox from "./SearchBox/SearchBox";

function Navbar() {
    const handleScroll = () => {
        if (window.scrollY > 0) {
            document.querySelector('.navbar').classList.add('navbar-scrolled');
        } else {
            document.querySelector('.navbar').classList.remove('navbar-scrolled');
        }
    }

    useLayoutEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
    return (
        <div className='navbar flex justify-between items-center px-8 py-2 bg-black w-full'>
            <div className='space-x-3'>
                <NavLink to={process.env.REACT_APP_LINK_HOME}>
                    <img src={logo} alt="logo" className='w-22 h-12 cursor-pointer'/>
                </NavLink>
                <NavLink to={process.env.REACT_APP_LINK_ALL_CONTENTS} activeStyle={{ color: 'red' }} style={{color: "white"}}>
                    All contents
                </NavLink>
                <NavLink to={process.env.REACT_APP_LINK_NEWS} activeStyle={{ color: 'red' }} style={{color: "white"}}>
                    News
                </NavLink>
            </div>
            <SearchBox/>
            <UserNav/>
        </div>
    );
}

export default React.memo(Navbar);
