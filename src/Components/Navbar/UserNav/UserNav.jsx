import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import localService from "../../../Services/local.service";
import {useHistory} from "react-router-dom";
import {removeUserInfo} from "../../../Redux/Slice/userSlice";

function UserNav() {
    const dispatch = useDispatch()
    const history = useHistory()
    let {userInfo} = useSelector(state => state.userSlice)

    let handleLogOut = () => {
        localService.removeUserInfo()
        dispatch(removeUserInfo())
    }

    let handleSignIn = () => {
        history.push('/login')
    }
    return (
        userInfo? (
            <div className='flex justify-between space-x-3 items-center'>
                <span>{userInfo.hoTen}</span>
                <button
                    className='btn'
                    onClick={handleLogOut}>Đăng Xuất
                </button>
            </div>
        ) : (
            <div>
                <button
                    className='bg-green-600 hover:bg-green-700 transition-all duration-300 ease-in-out rounded-lg px-2 py-1.5 text-white'
                    onClick={handleSignIn}>Đăng Nhập
                </button>
            </div>
        )
    );
}

export default UserNav;
