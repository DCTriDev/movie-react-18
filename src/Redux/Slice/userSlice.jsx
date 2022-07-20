import localService from "../../Services/local.service";
import {createSlice} from "@reduxjs/toolkit";
import userAPI from "../../API/userAPI";
import {message} from "antd";

const initialState = {
    userInfo: localService.getUserInfo(),
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            console.log(action.payload)
            state.userInfo = action.payload
            localService.setUserInfo(action.payload)
        },
        removeUserInfo: (state) => {
            state.userInfo = null
            localService.removeUserInfo()
        }
    }
})

export const userLoginActionThunk = (values) => {
    return (dispatch) => {
        userAPI.login(values)
            .then((res) => {
                console.log("res",res)
                message.success("Chúc mừng, bạn đã đăng nhập thành công!")
                dispatch(userSlice.actions.setUserInfo(res.data.content))
                // window.location.href = '/'
            })
            .catch((err) => {
                console.log("err",err)
                // message.error(err.err)
            })
    }
}

export const {removeUserInfo} = userSlice.actions

export default userSlice.reducer;
