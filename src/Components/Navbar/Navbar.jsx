import React, {useEffect} from 'react';
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

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
    return (
        <div className='navbar flex justify-between items-center px-8 py-2 bg-gray-300 w-full'>
            <NavLink to='/'>
                <img src={logo} alt="logo" className='w-22 h-12 cursor-pointer'/>
            </NavLink>
            <SearchBox/>
            <UserNav/>
        </div>
    );
}

export default React.memo(Navbar);
