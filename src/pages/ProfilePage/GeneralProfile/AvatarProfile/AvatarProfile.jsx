import React, { useState } from 'react'
import { CameraOutlined } from '@ant-design/icons'

import ModalUpdateAvatar from './ModalUpdateAvatar/ModalUpdateAvatar'

function AvatarProfile(props) {
  const { userInfo } = props

  const [visible, setVisible] = useState()

  return (
    <div className='lg:h-48 md:h-40 h-28 lg:w-48 md:w-40 w-28 relative'>
      <img src={userInfo?.avatar} alt='avatar' className='h-full w-full relative rounded-full' />
      <button className='absolute bottom-[8%] right-[4%] bg-black rounded-full cursor-pointer border-none lg:text-xl'
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
