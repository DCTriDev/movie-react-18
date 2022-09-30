import React, { useEffect, useState } from 'react'

import AvatarProfile from './AvatarProfile/AvatarProfile'
import PurchasedMovieProfile from './PurchasedMovieProfile/PurchasedMovieProfile'
import InfoProfile from './InfoProfile/InfoProfile'
import { initialStateGeneralProfile } from 'src/utils/initialState'
import userService from '@api/userAPI'

function GeneralProfile() {
  const [userInfo, setUserInfo] = useState(initialStateGeneralProfile)

  useEffect(() => {
    userService.getUserInfo()
      .then(res => {
        if (res.data.getUserInfo) {
          setUserInfo(res.data.getUserInfo)
        }
      })
  }, [])

  return (
    <>
      <div
        className='flex lg:flex-row md:flex-row flex-col justify-center items-center p-4 lg:space-x-28 md:space-x-20'>
        <AvatarProfile userInfo={userInfo} />

        <InfoProfile userInfo={userInfo} />
      </div>

      <PurchasedMovieProfile userInfo={userInfo} />
    </>
  )
}

export default GeneralProfile
