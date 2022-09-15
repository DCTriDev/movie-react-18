import React, {useEffect, useState} from 'react'
import {Form, Input, message, Select} from 'antd'
import adminService from '../../../../API/adminAPI'
import ModalCustom from '../../../../Components/ModalCustom/ModalCustom'
import FormCustom from '../../../../Components/FormCustom/FormCustom'
import {ButtonCustom} from '../../../../Components/ButtonCustom/ButtonCustom'

const {ButtonPrimary, ButtonDanger} = ButtonCustom
const {Option} = Select

function ModalUpdateCategory(props) {
    const {visible, setVisible, initialValues, fetchMovieData} = props
    const [category, setCategory] = useState([])

    console.log('initialValues',initialValues)
    const [form] = Form.useForm()

    const fetchCategoryData = () => {
        adminService.getAllCategory()
            .then(res => {
                setCategory(res.data.category)
            })
    }

    const handleRenderCategoryOption = () => {
        return category.map(({id, categoryName},index) => {
            return (
                <Option key={index} value={id}>
                    <span className='ml-2'>{categoryName}</span>
                </Option>
            )
        })
    }

    const handleCancel = () => {
        form.resetFields()
        setVisible(false)
    }

    useEffect(() => {
        fetchCategoryData()
    }, [])

    useEffect(() => {
        form.setFieldsValue(initialValues)
    }, [form, initialValues])


    const handleUpdateCategory = (values) => {
        console.log(values, 'values')
        adminService.updateMovieCategory(values)
            .then((res) => {
                if (res.data.updateMovieCategory) {
                    message.success('Update successfully!')
                    fetchMovieData()
                    setVisible(false)
                }else {
                    message.error('Update failed!', 3)
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
            forceRender
        >
            <FormCustom
                form={form}
                initialValues={initialValues}
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                onFinish={handleUpdateCategory}
            >
                <h3 className='text-2xl text-center text-text-color-secondary'>Update Movie Actor</h3>

                <Form.Item
                    label='Movie ID'
                    name='id'
                >
                    <Input disabled className='text-right' />
                </Form.Item>

                <Form.Item
                    label='Movie Title'
                    name='title'
                >
                    <Input disabled className='text-right' />
                </Form.Item>

                <Form.Item
                    label='Category'
                    name='categoryId'
                >
                    <Select className='text-right' mode='multiple'>
                        {
                            handleRenderCategoryOption()
                        }
                    </Select>
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

export default ModalUpdateCategory
