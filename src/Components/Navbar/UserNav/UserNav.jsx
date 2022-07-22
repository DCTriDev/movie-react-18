import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import localService from "../../../Services/local.service";
import {useHistory} from "react-router-dom";
import {removeUserInfo} from "../../../Redux/Slice/userSlice";
import {Dropdown} from 'antd';
import {ButtonCustom} from '../../ButtonCustom/ButtonCustom';
import UserMenu from '../../UserMenu/UserMenu';

const {ButtonPrimary} = ButtonCustom

function UserNav() {
    const dispatch = useDispatch()
    const history = useHistory()
    const {userInfo} = useSelector(state => state.userSlice)

    let handleLogOut = () => {
        localService.removeUserInfo()
        dispatch(removeUserInfo())
    }

    let handleSignIn = () => {
        history.push('/login')
    }

    const menu = (
        <UserMenu
            className='rounded-xl p-[4px] m-[-4px] w-fit'
            items={[
                {
                    key: '1',
                    label: (
                        <a className='flex items-center space-x-2 text-[16px]' rel='prefetch' href="/profile">
                            <ion-icon className='' name="person-outline"/>
                            <span>Profile</span>
                        </a>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <a className='flex items-center space-x-2 text-[16px]' href="/dashboard">
                            <ion-icon className='' name="settings-outline"/>
                            <span>Setting</span>
                        </a>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <a className='flex items-center space-x-2 text-[16px]' onClick={handleLogOut}>
                            <ion-icon className='' name="log-out-outline"/>
                            <span>Logout</span>
                        </a>
                    ),
                },
            ]}
        />
    );
    return (
        userInfo
            ?
            (
                <div>
                    <span className='pr-2.5'>Welcome, <strong className='text-red-600'>{userInfo.username}</strong></span>
                    <Dropdown
                        className='mr-6'
                        overlay={menu} placement="bottom"
                        arrow>
                        <img
                            className='rounded-full w-10 h-10 cursor-pointer'
                            src={userInfo.avatar} alt="avatar"/>
                    </Dropdown>
                </div>
            )
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
    );
}

// export default React.memo(UserNav);
export default UserNav;
