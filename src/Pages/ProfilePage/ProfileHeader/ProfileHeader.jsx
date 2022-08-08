import React from 'react';
import logo from '../../../Assets/Images/logo.png';
import UserNav from '../../../Components/Navbar/UserNav/UserNav'

function ProfileHeader(props) {
    return (
        <div className='flex justify-end w-full bg-black px-8 items-center py-3'>
            <UserNav/>
        </div>
    );
}

export default ProfileHeader;
