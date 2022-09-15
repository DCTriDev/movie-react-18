import React, {useEffect, useState} from 'react'
import FormCustom from '../../../../Components/FormCustom/FormCustom'
import {Form, Input, message, Select} from 'antd'
import ModalCustom from '../../../../Components/ModalCustom/ModalCustom'
import {ButtonCustom} from '../../../../Components/ButtonCustom/ButtonCustom'
import adminService from '../../../../API/adminAPI'
import UploadImage from '../../../../Components/UploadImage/UploadImage'

const {ButtonPrimary, ButtonDanger} = ButtonCustom

function ModalUpdateUserInfo(props) {
    const {visible, setVisible, initialValues, fetchUserData} = props
    const [avatar, setAvatar] = useState()

    const [form] = Form.useForm()

    const handleCancel = () => {
        form.resetFields()
        setVisible(false)
    }

    const handleUpdateUserInfo = (values) => {
        const newData = {
            ...values,
            avatar,
            birthday: (new Date(values.birthday).getTime()).toString(),
        }
        console.log(newData)
        adminService.updateUserAdmin(newData)
            .then(res => {
                if(res.data.updateUserAdmin.status) {
                    message.success('Update successfully!')
                    setVisible(false)
                    form.resetFields()
                    fetchUserData()
                }
            })
    }

    useEffect(() => {
        form.setFieldsValue(initialValues)
        setAvatar(avatar)
    }, [initialValues])

    return (
        <ModalCustom
            title={null}
            footer={null}
            visible={visible}
            onCancel={handleCancel}
            getContainer={false}
            forceRender
        >
            <FormCustom
                form={form}
                initialValues={initialValues}
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                onFinish={handleUpdateUserInfo}
            >
                <h3 className='text-2xl text-center text-text-color-secondary'>Edit User Info</h3>
                <Form.Item
                    label='User ID'
                    name='id'
                >
                    <Input disabled className='text-right' />
                </Form.Item>

                <Form.Item
                    label='Username'
                    name='username'
                >
                    <Input className='text-right' disabled/>
                </Form.Item>

                <Form.Item
                    label='Full name'
                    name='fullName'
                >
                    <Input className='text-right' />
                </Form.Item>

                <UploadImage label='Avatar' name='avatar' url={initialValues?.avatar} setUrl={setAvatar}/>

                <Form.Item
                    label='Birthday'
                    name='birthday'
                >
                    <Input type='date' className='text-right' />
                </Form.Item>

                <Form.Item
                    label='Email'
                    name='email'
                >
                    <Input className='text-right' />
                </Form.Item>

                <Form.Item
                    label='Role'
                    name='roleName'
                >
                    <Select className='text-right'>
                        <Select.Option value='ADMIN'>Admin</Select.Option>
                        <Select.Option value='USER'>User</Select.Option>
                    </Select>
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

                <Form.Item
                    label='Phone number'
                    name='phoneNumber'
                >
                    <Input className='text-right'/>
                </Form.Item>

                <div className='w-full flex justify-center space-x-40'>
                    <ButtonDanger
                        type='button'
                        onClick={handleCancel}
                    >
                        Cancel
                    </ButtonDanger>
                    <ButtonPrimary
                        type='submit'
                    >
                        Submit
                    </ButtonPrimary>
                </div>
            </FormCustom>
        </ModalCustom>
    )
}

export default ModalUpdateUserInfo
