import localService from "../../Services/local.service";
import {createSlice} from "@reduxjs/toolkit";
import userAPI from "../../API/userAPI";
import ApiErrorService from "../../API/apiErrorService";

const initialState = {
    userInfo: localService.getUserInfo(),
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
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
                if (res.data.login) {
                    dispatch(userSlice.actions.setUserInfo(res.data.login))
                    window.location.href = '/'
                }
                else {
                    ApiErrorService.handleError(res.errors)
                }
            })
            .catch((err) => {
                console.log("err",err)
                // message.error(err.err)
            })
    }
}

export const {removeUserInfo} = userSlice.actions

export default userSlice.reducer;
