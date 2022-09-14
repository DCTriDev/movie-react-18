import React, {useEffect, useState} from 'react'
import FormCustom from '../../../../Components/FormCustom/FormCustom'
import {Form, Input, message, Select} from 'antd'
import ModalCustom from '../../../../Components/ModalCustom/ModalCustom'
import {ButtonCustom} from '../../../../Components/ButtonCustom/ButtonCustom'
import adminService from '../../../../API/adminAPI'
import UploadImage from '../../../../Components/UploadImage/UploadImage'

const {ButtonPrimary, ButtonDanger} = ButtonCustom

function ModalUpdateActor(props) {
    const {visible, setVisible, initialValue, fetchActorData} = props
    const [url, setUrl] = useState()

    const [form] = Form.useForm()

    const handleCancel = () => {
        form.resetFields()
        setVisible(false)
    }

    const handleUpdateActorInfo = (values) => {
        const newData = {
            ...values,
            image: url,
            birthday: (new Date(values.birthday).getTime()).toString(),
        }
        adminService.updateActor(newData)
            .then(res => {
                if (res.data.updateActor.status) {
                    message.success('Update successfully!')
                    setVisible(false)
                    fetchActorData()
                }
            })
    }

    useEffect(() => {
        form.setFieldsValue(initialValue)
        setUrl(url)
    },[initialValue])

    return (
        <ModalCustom
            title={null}
            footer={null}
            visible={visible}
            onCancel={handleCancel}
            forceRender
        >
            <FormCustom
                form={form}
                initialValues={initialValue}
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                onFinish={handleUpdateActorInfo}
            >
                <h3 className='text-2xl text-center text-text-color-secondary'>Edit Actor Info</h3>
                <Form.Item
                    label='Actor ID'
                    name='id'
                >
                    <Input disabled className='text-right' />
                </Form.Item>

                <Form.Item
                    label='Name'
                    name='name'
                >
                    <Input className='text-right' />
                </Form.Item>

                <Form.Item
                    label='Birthday'
                    name='birthday'
                >
                    <Input type='date' className='text-right' />
                </Form.Item>

                <UploadImage label='Image' name='image' url={initialValue?.image} setUrl={setUrl}/>

                <Form.Item
                    label='Gender'
                    name='genderId'
                >
                    <Select className='text-right'>
                        <Select.Option value={1}>Male</Select.Option>
                        <Select.Option value={2}>Female</Select.Option>
                    </Select>
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
                        Update
                    </ButtonPrimary>
                </div>
            </FormCustom>
        </ModalCustom>
    )
}

export default ModalUpdateActor
