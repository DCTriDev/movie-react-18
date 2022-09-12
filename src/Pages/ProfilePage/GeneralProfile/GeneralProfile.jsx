import React, {useEffect, useState} from 'react'
import userService from '../../../API/userAPI'
import AvatarProfile from './AvatarProfile/AvatarProfile'
import PurchasedMovieProfile from './PurchasedMovieProfile/PurchasedMovieProfile'
import InfoProfile from './InfoProfile/InfoProfile'

const initialState = {
    avatar: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg',
    username: 'Loading...',
    fullName: 'Loading...',
    email: 'Loading...',
    phoneNumber: 'Loading...',
    birthday: 'Loading...',
    genderId: 1,
    balance: 0,
    purchasedMovie: [
        {
            id: 'Loading...',
            title: 'Loading...',
            image: 'https://static.vecteezy.com/system/resources/thumbnails/001/826/199/small/progress-loading-bar-buffering-download-upload-and-loading-icon-vector.jpg',
        },
    ],
}

function GeneralProfile(props) {
    const [userInfo, setUserInfo] = useState(initialState)

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
            <div className='flex flex-col justify-center items-center p-4'>
                <AvatarProfile userInfo={userInfo} />

                <InfoProfile userInfo={userInfo} />
            </div>

            <PurchasedMovieProfile userInfo={userInfo} />
        </>
    )
}

export default GeneralProfile
