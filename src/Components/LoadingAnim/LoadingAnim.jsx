import React from 'react';
import { Spin, Space } from 'antd';
import {useSelector} from "react-redux";

function LoadingAnim() {
    let loading= useSelector(state => state.loadingAnimSlice.loading);
    return (
        loading?(
            <div className='w-screen h-screen fixed flex justify-center items-center z-[9999999] bg-black bg-opacity-20'>
                <Space size="large">
                    <Spin size="large" />
                </Space>
            </div>
        ):(
            <></>
        )
    );
}

export default LoadingAnim;
