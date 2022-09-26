import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import bg from '@assets/images/bg.png'
import { LockSVG } from '@assets/svgs/VectorSVG'
import FormLogIn from './FormLogIn/FormLogIn'

const bgImageStyle = {
  background: `url(${bg}) no-repeat center center`,
  backgroundSize: 'cover',
}

function LogInPage() {
  const { userInfo } = useSelector(state => state.userSlice)

  useEffect(() => {
    if (userInfo) {
      window.location.href = '/'
    }
  }, [userInfo])

  if (!userInfo) return (
    <div style={bgImageStyle} className='lg:px-32 h-screen w-screen'>
      <div className='flex justify-center items-center w-full h-full'>
        <div className='lg:block hidden lg:w-1/2'>
          <div className='rounded-full w-fit bg-amber-200 bg-opacity-70 p-6 translate-x-[50%]'>
            <LockSVG className='w-60 h-60' />
          </div>
        </div>
        <div className='lg:w-1/2 md:w-4/5 h-full flex justify-center'>
          <div className='rounded-3xl bg-[#161A1C] px-12 py-6 h-fit self-center'>
            <FormLogIn />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <></>
  )
}

export default LogInPage
