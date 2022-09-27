import React, { useState } from 'react'
import { UserOutlined } from '@ant-design/icons'

import useDevice from '@hooks/useDevice'
import Sidebar from '@components/sidebar/Sidebar'
import Footer from '@components/footer/Footer'
import GeneralProfile from './GeneralProfile/GeneralProfile'
import ProfileHeader from './ProfileHeader/ProfileHeader'

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  }
}

const items = [
  getItem('General', '1', <UserOutlined />),
  // getItem('Transactions', '2', <ShoppingCartOutlined />),
]

function ProfilePage() {
  const [contentKey, setContentKey] = useState(<div>General</div>)

  const isDesktop = useDevice()

  const handleRenderContent = (key) => {
    switch (key) {
      case '1':
        return (<GeneralProfile />)
      case '2':
        return (<div>Transactions</div>)
      default:
        return (<GeneralProfile />)
    }
  }

  return (
    <div className='min-h-[100vh] flex w-full'>
      <Sidebar items={items} isDesktop={isDesktop} defaultSelectedKeys={['1']} setContent={setContentKey} />
      <div className='w-full'>
        <ProfileHeader />
        <div className='lg:pl-2 min-h-screen mb-2'>
          {handleRenderContent(contentKey)}
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default ProfilePage
