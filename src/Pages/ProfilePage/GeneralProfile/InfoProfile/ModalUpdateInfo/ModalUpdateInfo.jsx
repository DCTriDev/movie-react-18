import React from 'react'
import FormCustom from '../../../../../Components/FormCustom/FormCustom'
import {Form, Input, Select} from 'antd'
import ModalCustom from '../../../../../Components/ModalCustom/ModalCustom'
import userService from '../../../../../API/userAPI'
import localService from '../../../../../Services/local.service'
import {ButtonCustom} from '../../../../../Components/ButtonCustom/ButtonCustom'

const {ButtonPrimary, ButtonDanger} = ButtonCustom

function ModalUpdateInfo(props) {
    const {visible, setVisible, initialValues} = props

    const [form] = Form.useForm()

    const handleUpdateProfile = (values) => {
        const newValues = {
            ...values,
            birthday: (new Date(values.birthday).getTime()).toString(),
        }
        userService.updateProfile(newValues)
            .then(res => {
                if (res.data.updateProfile) {
                    setVisible(false)
                    form.resetFields()
                    localService.refreshUserInfo(res.data.updateProfile)
                    window.location.reload()
                }
            })
    }

    return (
        <ModalCustom
            title={null}
            footer={null}
            visible={visible}
            onCancel={() => {
                setVisible(false)
            }}
            getContainer={false}
            className='relative'
        >
            <FormCustom
                form={form}
                initialValues={initialValues}
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
                        setVisible(false)
                        form.resetFields()
                    }}
                >
                    Cancel
                </ButtonDanger>
            </div>
        </ModalCustom>
    )
}

export default ModalUpdateInfo
