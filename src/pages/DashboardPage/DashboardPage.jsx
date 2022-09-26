import React, { useLayoutEffect, useState } from 'react'
import { IdcardOutlined, PlaySquareOutlined, PlusSquareOutlined, UserOutlined } from '@ant-design/icons'

import { ButtonPrimary } from '@components/button/ButtonCustom'
import Sidebar from '@components/sidebar/Sidebar'
import UserNav from '@components/navbar/userNav/UserNav'
import UserManagement from './UserManagement/UserManagement'
import MovieManagement from './MovieManagement/MovieManagement'
import ActorManagement from './ActorManagement/ActorManagement'
import AddMovie from './AddMovie/AddMovie'

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  }
}

const items = [
  getItem('Movie', '1', <PlaySquareOutlined />),
  getItem('Actor', '2', <IdcardOutlined />),
  getItem('User', '3', <UserOutlined />),
  getItem('Add Movie', '4', <PlusSquareOutlined />),
]

function DashboardPage() {
  const [isDesktop, setIsDeskTop] = useState(window.innerWidth >= 992)
  const [contentKey, setContentKey] = useState('1')

  const handleResize = () => {
    if (window.innerWidth < 992) {
      setIsDeskTop(false)
    } else {
      setIsDeskTop(true)
    }
  }

  const handleRenderContent = (key) => {
    switch (key) {
      case '1':
        return <MovieManagement />
      case '2':
        return <ActorManagement />
      case '3':
        return <UserManagement />
      case '4':
        return <AddMovie />
      default:
        return <MovieManagement />
    }
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  if (isDesktop) return (
    <div className='min-h-[100vh] flex w-full'>
      <Sidebar
        items={items}
        isDesktop={isDesktop}
        defaultSelectedKeys={['1']}
        setContent={setContentKey}
      />
      <div className='w-full relative'>
        <div className='absolute right-16 top-2'>
          <UserNav />
        </div>
        <div className='px-2'>{handleRenderContent(contentKey)}</div>
      </div>
    </div>
  )

  return (
    <div className='min-h-[100vh] flex w-full'>
      <div className='w-screen h-screen flex flex-col items-center justify-center'>
        <div className='px-4'>
          <h1 className='md:text-2xl text-xl text-yellow-500 text-center'>
            You must be login on desktop device to continue.
          </h1>
        </div>
        <ButtonPrimary onClick={() => (window.location.href = '/')}>Homepage</ButtonPrimary>
      </div>
    </div>
  )
}

export default DashboardPage
