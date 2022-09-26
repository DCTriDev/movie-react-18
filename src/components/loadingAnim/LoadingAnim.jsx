import React from 'react'
import { useSelector } from 'react-redux'
import { Space, Spin } from 'antd'

function LoadingAnim() {
  const loading = useSelector(state => state.loadingAnimSlice.loading)
  
  if (loading) return (
    <div className='w-screen h-screen fixed flex justify-center items-center z-[9999999] bg-black bg-opacity-20'>
      <Space size='large'>
        <Spin size='large' />
      </Space>
    </div>
  )

  return (
    <></>
  )
}

export default LoadingAnim
