import localService from "../../Services/local.service";
import {createSlice} from "@reduxjs/toolkit";
import httpService from "../../API/userAPI";

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
        }
    }
})

export const userLoginActionThunk = (values) => {
    return (dispatch) => {
        httpService.login(values).then((res) => {
            dispatch(userSlice.actions.setUserInfo(res.data.content))
            window.location.href = '/'
        })
    }
}

export const {removeUserInfo} = userSlice.actions

export default userSlice.reducer;
