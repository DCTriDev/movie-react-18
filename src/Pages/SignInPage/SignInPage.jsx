import React, {useEffect} from 'react';
import FormSignIn from "./FormSignIn/FormSignIn";
import {useSelector} from "react-redux";

function SignInPage() {
    let {userInfo} = useSelector(state => state.userSlice);
    useEffect(() => {
        if (userInfo) {
            window.location.href = '/'
        }
    },[])
    return (
        userInfo
            ?
            <></>
            :
            <div className='h-screen px-32 py-16 bg-gray-200'>
                <FormSignIn/>
            </div>
    );
}

export default SignInPage;
