import React, {useState} from 'react'
import moment from 'moment/moment'
import ModalUpdateInfo from './ModalUpdateInfo/ModalUpdateInfo'
import {ButtonCustom} from '../../../../Components/ButtonCustom/ButtonCustom'

const {ButtonSubmit} = ButtonCustom

function InfoProfile(props) {
    const {userInfo} = props
    const [updateProfileData, setUpdateProfileData] = useState(false)
    const [visible, setVisible] = useState(false)

    return (
        <div className='p-6 rounded-2xl bg-black mt-3'>
            <h2 className='text-center text-text-color-secondary'>Information</h2>
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
                    <tr>
                        <td>Birthday:</td>
                        <td className='text-right'>{moment(+userInfo?.birthday).format('DD-MM-YYYY')}</td>
                    </tr>
                    <tr>
                        <td>Gender:</td>
                        <td className='text-right'>{userInfo?.genderId === 1 ? 'Male' : 'Female'}</td>
                    </tr>
                    <tr>
                        <td>Balance:</td>
                        <td className='text-right'>{userInfo?.balance}$</td>
                    </tr>
                </tbody>
            </table>
            <div className='flex justify-center mt-5'>
                <ButtonSubmit
                    onClick={() => {
                        setVisible(true)
                        setUpdateProfileData({
                            ...userInfo,
                            birthday: moment(+userInfo?.birthday).format('yyyy-MM-DD'),
                        })
                    }}
                >Update Profile</ButtonSubmit>
            </div>

            <ModalUpdateInfo visible={visible}
                             setVisible={setVisible}
                             initialValues={updateProfileData}
            />
        </div>
    )
}

export default InfoProfile
