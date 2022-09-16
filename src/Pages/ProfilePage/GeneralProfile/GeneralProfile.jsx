import React, {useEffect, useState} from 'react'
import userService from '../../../API/userAPI'
import AvatarProfile from './AvatarProfile/AvatarProfile'
import PurchasedMovieProfile from './PurchasedMovieProfile/PurchasedMovieProfile'
import InfoProfile from './InfoProfile/InfoProfile'
import {initialStateGeneralProfile} from '../../../Utils/initialState'

function GeneralProfile(props) {
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
            <div className='flex lg:flex-row md:flex-row flex-col justify-center items-center p-4 lg:space-x-28 md:space-x-20'>
                <AvatarProfile userInfo={userInfo} />

                <InfoProfile userInfo={userInfo} />
            </div>

            <PurchasedMovieProfile userInfo={userInfo} />
        </>
    )
}

export default GeneralProfile
