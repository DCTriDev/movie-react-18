import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import localService from '../../../Services/local.service'
import {useHistory} from 'react-router-dom'
import {removeUserInfo} from '../../../Redux/Slice/userSlice'
import {Dropdown} from 'antd'
import {ButtonCustom} from '../../ButtonCustom/ButtonCustom'
import UserMenu from '../../UserMenu/UserMenu'

const {ButtonPrimary} = ButtonCustom

function UserNav(props) {
    const {isDesktop} = props
    const dispatch = useDispatch()
    const history = useHistory()
    const {userInfo} = useSelector(state => state.userSlice)

    let handleLogOut = () => {
        localService.removeUserInfo()
        history.push('/')
        dispatch(removeUserInfo())
    }

    let handleSignIn = () => {
        history.push('/login')
    }

    const handleRenderUserNav = () => {
        return isDesktop
            ?
            (
                <div>
                    <span className='pr-2.5'>Hi, <strong
                        className='text-text-color-secondary'>{userInfo.username}</strong></span>
                    <Dropdown
                        className='mr-6'
                        overlay={localService.isAdmin() ? menuADMIN : menu} placement='bottom'
                        arrow={isDesktop}
                        overlayClassName={
                            isDesktop ? '' : 'left-[unset] right-[4px]'
                        }
                    >
                        <img
                            className='rounded-full w-10 h-10 cursor-pointer'
                            src={userInfo.avatar} alt='avatar' />
                    </Dropdown>
                </div>
            )
            :
            (
                <Dropdown
                    className=''
                    overlay={localService.isAdmin() ? menuADMIN : menu} placement='bottom'
                    arrow={isDesktop}
                    overlayClassName={
                        isDesktop ? '' : 'left-[unset] right-[4px]'
                    }
                >
                    <img
                        className='rounded-full w-10 h-10 cursor-pointer'
                        src={userInfo.avatar} alt='avatar' />
                </Dropdown>
            )

    }

    const menu = (
        <UserMenu
            className='rounded-xl p-[4px] m-[-4px] w-fit bg-black'
            items={[
                {
                    key: '1',
                    label: (
                        <a className='flex items-center space-x-2 lg:text-[16px] md:text-[14px]' rel='prefetch'
                           href='/profile'>
                            <ion-icon className='' name='person-outline' />
                            <span>Profile</span>
                        </a>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <a className='flex items-center space-x-2 lg:text-[16px] md:text-[14px]' onClick={handleLogOut}>
                            <ion-icon className='' name='log-out-outline' />
                            <span>Logout</span>
                        </a>
                    ),
                },
            ]}
        />
    )

    const menuADMIN = (
        <UserMenu
            className='rounded-xl p-[4px] m-[-4px] w-fit bg-black'
            items={[
                {
                    key: '1',
                    label: (
                        <a className='flex items-center space-x-2 lg:text-[16px] md:text-[14px]' rel='prefetch'
                           href='/profile'>
                            <ion-icon className='' name='person-outline' />
                            <span>Profile</span>
                        </a>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <a className='flex items-center space-x-2 lg:text-[16px] md:text-[14px]' href='/dashboard'>
                            <ion-icon name='grid-outline'></ion-icon>
                            <span>Dashboard</span>
                        </a>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <a className='flex items-center space-x-2 lg:text-[16px] md:text-[14px]' onClick={handleLogOut}>
                            <ion-icon className='' name='log-out-outline' />
                            <span>Logout</span>
                        </a>
                    ),
                },
            ]}
        />
    )

    return (
        userInfo
            ?
            handleRenderUserNav()
            :
            (
                <>
                    <ButtonPrimary
                        onClick={handleSignIn}
                    >
                        Login
                    </ButtonPrimary>
                </>
            )
    )
}

// export default React.memo(UserNav);
export default UserNav
