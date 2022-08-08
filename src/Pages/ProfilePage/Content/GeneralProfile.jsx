import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {CameraOutlined} from '@ant-design/icons'
import {Modal} from 'antd'

function GeneralProfile(props) {
    const {userInfo} = useSelector(state => state.userSlice)
    console.log(userInfo)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <div className='flex flex-col justify-center items-center p-4'>
                <div className='h-28 w-28 relative'>
                    <img src={userInfo?.avatar} alt='avatar' className='h-28 w-28 relative' />
                    <button className='absolute bottom-0 -right-1 bg-background-search rounded-full cursor-pointer'
                            onClick={showModal}
                    >
                        <CameraOutlined />
                    </button>
                    <Modal title="Update Avatar"
                           visible={isModalVisible}
                           onOk={handleOk}
                           onCancel={handleCancel}
                    >
                        <p>Choose an image</p>
                    </Modal>
                </div>
                <table className='w-full lg:w-[480px]'>
                    <tbody>
                        <tr>
                            <td>Username:</td>
                            <td className='text-right'>{userInfo?.username}</td>
                        </tr>
                        <tr>
                            <td>Full name:</td>
                            <td className='text-right'>{userInfo?.fullName}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td className='text-right'>{userInfo?.email}</td>
                        </tr>
                        <tr>
                            <td>Phone number:</td>
                            <td className='text-right'>{userInfo?.phoneNumber}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='grid grid-cols-2'>
                <div className='col-span-1'>
                    1
                </div>
                <div className='col-span-1'>
                    2
                </div>
            </div>
        </>
    )
}

export default GeneralProfile;
