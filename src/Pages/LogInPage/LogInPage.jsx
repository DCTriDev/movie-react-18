import React, {useEffect} from 'react';
import FormLogIn from "./FormLogIn/FormLogIn";
import {useSelector} from "react-redux";
import {VectorSVG} from '../../Assets/Svgs/VectorSVG'
import bg from'../../Assets/Images/bg.png';

const {LockSVG} = VectorSVG

const bgImageStyle = {
    background: `url(${bg}) no-repeat center center`,
    backgroundSize: 'cover',
}

function LogInPage() {
    let {userInfo} = useSelector(state => state.userSlice);
    useEffect(() => {
        if (userInfo) {
            window.location.href = '/'
        }
    },[userInfo])
    return (
        userInfo
            ?
            <></>
            :
            <div style={bgImageStyle} className='lg:px-32 h-screen w-screen'>
                <div className='flex justify-center items-center w-full h-full'>
                    <div className='lg:block hidden lg:w-1/2'>
                        <div className='rounded-full w-fit bg-amber-200 bg-opacity-70 p-6 translate-x-[50%]'>
                            <LockSVG className='w-60 h-60'/>
                        </div>
                    </div>
                    <div className='lg:w-1/2 md:w-4/5 h-full flex justify-center'>
                        <div className='rounded-3xl bg-[#161A1C] px-12 py-6 h-fit self-center'>
                            <FormLogIn/>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default LogInPage;
