import React, { useEffect, useState } from 'react'
import { Form, Input, message, Select } from 'antd'

import { ButtonDanger, ButtonPrimary } from '@components/button/ButtonCustom'
import ModalCustom from '@components/modal/ModalCustom'
import FormCustom from '@components/form/FormCustom'
import adminService from '@api/adminAPI'

const { Option } = Select

function ModalUpdateCategory(props) {
  const { visible, setVisible, initialValues, fetchMovieData } = props
  const [category, setCategory] = useState([])

  const [form] = Form.useForm()

  const handleRenderCategoryOption = () => {
    return category.map(({ id, categoryName }, index) => {
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

  const handleUpdateCategory = (values) => {
    console.log(values, 'values')
    adminService.updateMovieCategory(values).then((res) => {
      if (!res.data.updateMovieCategor) {
        return message.error('Update failed!', 3)
      }
      message.success('Update successfully!')
      fetchMovieData()
      setVisible(false)
    })
  }

  const fetchCategoryData = () => {
    adminService.getAllCategory().then((res) => {
      setCategory(res.data.category)
    })
  }

  useEffect(() => {
    fetchCategoryData()
  }, [])

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
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={handleUpdateCategory}
      >
        <h3 className='text-2xl text-center text-text-color-secondary'>Update Movie Actor</h3>

        <Form.Item label='Movie ID' name='id'>
          <Input disabled className='text-right' />
        </Form.Item>

        <Form.Item label='Movie Title' name='title'>
          <Input disabled className='text-right' />
        </Form.Item>

        <Form.Item label='Category' name='categoryId'>
          <Select className='text-right' mode='multiple'>
            {handleRenderCategoryOption()}
          </Select>
        </Form.Item>

        <div className='w-full flex justify-center'>
          <div className='w-full flex justify-center space-x-40'>
            <ButtonDanger type='button' onClick={handleCancel}>
              Cancel
            </ButtonDanger>
            <ButtonPrimary type='submit'>Update</ButtonPrimary>
          </div>
        </div>
      </FormCustom>
    </ModalCustom>
  )
}

export default ModalUpdateCategory
