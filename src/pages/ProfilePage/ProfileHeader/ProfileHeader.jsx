import React from 'react'
import UserNav from '@components/navbar/userNav/UserNav'

function ProfileHeader() {
  return (
    <div className='flex justify-end w-full bg-black px-8 items-center py-3'>
      <UserNav />
    </div>
  )
}

export default ProfileHeader
