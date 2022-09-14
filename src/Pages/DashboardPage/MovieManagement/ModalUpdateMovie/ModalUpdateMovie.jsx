import React, {useEffect, useState} from 'react'
import FormCustom from '../../../../Components/FormCustom/FormCustom'
import {Form, Input, message, Select} from 'antd'
import ModalCustom from '../../../../Components/ModalCustom/ModalCustom'
import {ButtonCustom} from '../../../../Components/ButtonCustom/ButtonCustom'
import adminService from '../../../../API/adminAPI'
import UploadImage from '../../../../Components/UploadImage/UploadImage'

const {ButtonPrimary, ButtonDanger} = ButtonCustom

function ModalUpdateMovie(props) {
    const {visible, setVisible, initialValues, fetchMovieData} = props
    const [url, setUrl] = useState()

    const [form] = Form.useForm()

    const handleCancel = () => {
        form.resetFields()
        setVisible(false)
    }

    const handleUpdateMovie = (values) => {
        const newData = {
            ...values,
            image: url,
            releaseDate: (new Date(values.releaseDate).getTime()).toString(),
        }
        adminService.updateMovieBasic(newData, true)
            .then((res) => {
                if (res.data.updateMovieBasic) {
                    message.success('Update successfully')
                    fetchMovieData()
                    setVisible(false)
                } else {
                    message.error('Update failed!')
                }
            })
    }

    useEffect(() => {
        form.setFieldsValue(initialValues)
    }, [form, initialValues])

    return (
        <ModalCustom
            title={null}
            footer={null}
            visible={visible}
            onCancel={() => {
                setVisible(false)
            }}
            getContainer={false}
            forceRender
        >
            <FormCustom
                form={form}
                initialValues={initialValues}
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                onFinish={handleUpdateMovie}
            >
                <h3 className='text-2xl text-center text-text-color-secondary'>Editing Basic Info</h3>
                <Form.Item
                    label='Movie ID'
                    name='id'
                >
                    <Input disabled className='text-right' />
                </Form.Item>

                <Form.Item
                    label='Title'
                    name='title'
                >
                    <Input className='text-right' />
                </Form.Item>

                <Form.Item
                    label='Director'
                    name='director'
                >
                    <Input className='text-right' />
                </Form.Item>

               <UploadImage label='image' name='image' url={initialValues?.image} setUrl={setUrl}/>

                <Form.Item
                    label='Release Date'
                    name='releaseDate'
                >
                    <Input type='date' className='text-right' />
                </Form.Item>

                <Form.Item
                    label='Price'
                    name='price'
                >
                    <Input className='text-right' />
                </Form.Item>

                <Form.Item
                    label='Status'
                    name='status'
                >
                    <Select className='text-right' theme='dark'>
                        <Select.Option value='Released'>Released</Select.Option>
                        <Select.Option value='Upcoming'>Upcoming</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label='Description'
                    name='description'
                >
                    <Input.TextArea autoSize={{minRows: 4, maxRows: 7}} />
                </Form.Item>

                <div className='w-full flex justify-center'>
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
                </div>

            </FormCustom>
        </ModalCustom>
    )
}

export default ModalUpdateMovie
