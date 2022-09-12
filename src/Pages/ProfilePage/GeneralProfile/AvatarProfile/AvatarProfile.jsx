import React, {useState} from 'react'
import {CameraOutlined} from '@ant-design/icons'
import ModalUpdateAvatar from './ModalUpdateAvatar/ModalUpdateAvatar'

function AvatarProfile(props) {
    const {userInfo} = props

    const [visible, setVisible] = useState()

    return (
        <div className='h-28 w-28 relative'>
            <img src={userInfo?.avatar} alt='avatar' className='h-28 w-28 relative rounded-full' />
            <button className='absolute bottom-0 -right-1 bg-background-search rounded-full cursor-pointer'
                    onClick={() => {
                        setVisible(true)
                    }}
            >
                <CameraOutlined />
            </button>

            <ModalUpdateAvatar
                visible={visible}
                setVisible={setVisible}
            />
        </div>
    )
}

export default AvatarProfile
