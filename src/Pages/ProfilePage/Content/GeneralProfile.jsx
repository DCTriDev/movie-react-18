import React, {useEffect, useState} from 'react'
import {CameraOutlined} from '@ant-design/icons'
import {Form, Input, Select} from 'antd'
import FormCustom from '../../../Components/FormCustom/FormCustom'
import ModalCustom from '../../../Components/ModalCustom/ModalCustom'
import {ButtonCustom} from '../../../Components/ButtonCustom/ButtonCustom'
import localService from '../../../Services/local.service'
import userService from '../../../API/userAPI'
import moment from 'moment'
import ItemMovie from '../../HomePage/ListMovies/ItemMovie'

const {ButtonPrimary, ButtonDanger, ButtonSubmit} = ButtonCustom

const initialState = {
    avatar: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg',
    username: 'Loading...',
    fullName: 'Loading...',
    email: 'Loading...',
    phoneNumber: 'Loading...',
    birthday: 'Loading...',
    genderId: 1,
    balance: 0,
    purchasedMovie: [
        {
            id: 'Loading...',
            title: 'Loading...',
            // image: 'https://cdn2.unrealengine.com/en-13pr-movienite-motd-1920x1080-1920x1080-295750369.jpg',
            image: 'https://static.vecteezy.com/system/resources/thumbnails/001/826/199/small/progress-loading-bar-buffering-download-upload-and-loading-icon-vector.jpg',
        },
    ],
}

function GeneralProfile(props) {
    const [userInfo, setUserInfo] = useState(initialState)

    const [updateAvatarData, setUpdateAvatarData] = useState()
    const [updateProfileData, setUpdateProfileData] = useState(false)
    const [isUpdateAvatar, setIsUpdateAvatar] = useState(false)
    const [isUpdateProfile, setIsUpdateProfile] = useState(false)
    const [urlAvatar, setUrlAvatar] = useState()

    const [formUpdateAvatar] = Form.useForm()
    const [formUpdateProfile] = Form.useForm()

    const handleUpdateAvatar = (values) => {
        userService.updateAvatar(values)
            .then(res => {
                console.log(res)
                if (res.data.updateAvatar) {
                    setIsUpdateAvatar(false)
                    setUrlAvatar(res.data.updateAvatar.avatar)
                    localService.refreshAvatar(values.avatar)
                    window.location.reload()
                }
            })
    }

    const handleUpdateProfile = (values) => {
        const newValues = {
            ...values,
            birthday: (new Date(values.birthday).getTime()).toString(),
        }
        console.log(newValues)
        userService.updateProfile(newValues)
            .then(res => {
                console.log(res)
                if (res.data.updateProfile) {
                    setIsUpdateProfile(false)
                    formUpdateProfile.resetFields()
                    localService.refreshUserInfo(res.data.updateProfile)
                    window.location.reload()
                }
            })
    }

    const handleRenderPurchasedMovie = () => {
        console.log(userInfo.purchasedMovie.length)
        if (userInfo.purchasedMovie.length > 0) {
            return userInfo.purchasedMovie?.map((item, key) => {
                return (
                    <ItemMovie data={item} key={key} />
                )
            })
        } else return <div className='text-center col-span-6'>No movie found!</div>
    }

    useEffect(() => {
        userService.getUserInfo()
            .then(res => {
                if (res.data.getUserInfo) {
                    setUserInfo(res.data.getUserInfo)
                }
            })
    }, [])

    return (
        <>
            <div className='flex flex-col justify-center items-center p-4'>
                <div className='h-28 w-28 relative'>
                    <img src={userInfo?.avatar} alt='avatar' className='h-28 w-28 relative rounded-full' />
                    <button className='absolute bottom-0 -right-1 bg-background-search rounded-full cursor-pointer'
                            onClick={() => {
                                setIsUpdateAvatar(true)
                                setUrlAvatar(userInfo?.avatar)
                                setUpdateAvatarData(userInfo)
                            }}
                    >
                        <CameraOutlined />
                    </button>

                    <ModalCustom
                        title={null}
                        footer={null}
                        visible={isUpdateAvatar}
                        onCancel={() => {
                            setIsUpdateAvatar(false)
                        }}
                        getContainer={false}
                    >
                        <FormCustom
                            form={formUpdateAvatar}
                            initialValues={updateAvatarData}
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}
                            onFinish={handleUpdateAvatar}
                        >
                            <h3 className='text-2xl text-center text-text-color-secondary'>Choose Avatar</h3>
                            <Form.Item
                                label='Avatar URL'
                                name='avatar'
                            >
                                <Input className='text-right' name='image' onChange={(e) => {
                                    setUrlAvatar(e.target.value)
                                }} />
                            </Form.Item>

                            <Form.Item
                                label='Preview avatar'
                                name='previewAvatar'
                            >
                                <img src={urlAvatar} alt='previewImage' height='120' />
                            </Form.Item>

                            <div className='w-full flex justify-end '>
                                <ButtonPrimary
                                    type='submit'
                                    className='mr-10'
                                >
                                    Submit
                                </ButtonPrimary>
                            </div>
                        </FormCustom>
                        <div className='absolute bottom-6 left-16'>
                            <ButtonDanger
                                onClick={() => {
                                    setIsUpdateAvatar(false)
                                    setUrlAvatar(userInfo?.avatar)
                                    formUpdateAvatar.resetFields()
                                }}
                            >
                                Cancel
                            </ButtonDanger>
                        </div>
                    </ModalCustom>
                </div>
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
                                setIsUpdateProfile(true)
                                setUpdateProfileData({
                                    ...userInfo,
                                    birthday: moment(+userInfo?.birthday).format('yyyy-MM-DD'),
                                })
                            }}
                        >Update Profile</ButtonSubmit>
                    </div>

                    <ModalCustom
                        title={null}
                        footer={null}
                        visible={isUpdateProfile}
                        onCancel={() => {
                            setIsUpdateProfile(false)
                        }}
                        getContainer={false}
                        className='relative'
                    >
                        <FormCustom
                            form={formUpdateProfile}
                            initialValues={updateProfileData}
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}
                            onFinish={handleUpdateProfile}
                        >
                            <h3 className='text-2xl text-center text-text-color-secondary'>Update Information</h3>
                            <Form.Item
                                label='Username'
                                name='username'
                            >
                                <Input className='text-right' disabled />
                            </Form.Item>

                            <Form.Item
                                label='Full name'
                                name='fullName'
                            >
                                <Input className='text-right' />
                            </Form.Item>

                            <Form.Item
                                label='Phone number'
                                name='phoneNumber'
                            >
                                <Input className='text-right' />
                            </Form.Item>

                            <Form.Item
                                label='Email'
                                name='email'
                            >
                                <Input className='text-right' />
                            </Form.Item>

                            <Form.Item
                                label='Birthday'
                                name='birthday'
                            >
                                <Input type='date' className='text-right' />
                            </Form.Item>

                            <Form.Item
                                label='Gender'
                                name='genderId'
                            >
                                <Select className='text-right'>
                                    <Select.Option value={1}>Male</Select.Option>
                                    <Select.Option value={2}>Female</Select.Option>
                                </Select>
                            </Form.Item>

                            <div className='w-full flex justify-end space-x-10'>
                                <ButtonPrimary
                                    type='submit'
                                    className='mr-10'
                                >
                                    Submit
                                </ButtonPrimary>
                            </div>
                        </FormCustom>
                        <div className='absolute bottom-6 left-16'>
                            <ButtonDanger
                                onClick={() => {
                                    setIsUpdateProfile(false)
                                }}
                            >
                                Cancel
                            </ButtonDanger>
                        </div>
                    </ModalCustom>
                </div>
            </div>

            <div className='grid grid-cols-6 bg-black rounded-2xl p-6 space-x-3 space-y-3'>
                <div className='col-span-6'>
                    <h2 className='text-text-color-secondary'>Purchased Movie</h2>
                </div>
                {
                    handleRenderPurchasedMovie()
                }
            </div>
        </>
    )
}

export default GeneralProfile
